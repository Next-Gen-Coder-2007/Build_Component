const { GoogleGenerativeAI } = require("@google/generative-ai");
const Message = require("../models/message.model");

let lastCall = 0;
const RATE_LIMIT_INTERVAL = 1000; // 1 request per second

// Helper: rate-limited AI call
const aiGenerate = async (prompt) => {
  const now = Date.now();
  const wait = Math.max(0, RATE_LIMIT_INTERVAL - (now - lastCall));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));

  lastCall = Date.now();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    if (!result?.response?.text) return "";
    return result.response.text();
  } catch (error) {
    console.error("AI generation failed:", error);
    return "";
  }
};

// Helper: safely parse JSON from AI markdown
function parseMarkdownJSON(input) {
  if (!input) return { explanation: [], code: "" };

  try {
    // Remove code fences and trim
    const cleaned = input.replace(/```json/g, "").replace(/```/g, "").trim();

    // Remove stray newlines or control characters
    const sanitized = cleaned.replace(/[\u0000-\u001F]+/g, "");

    const data = JSON.parse(sanitized);

    // Provide defaults if keys missing
    return {
      explanation: Array.isArray(data.explanation) ? data.explanation : [],
      code: typeof data.code === "string" ? data.code : "",
    };
  } catch (err) {
    console.error("JSON Parse Error:", err.message);
    return { explanation: [], code: "" };
  }
}

// Save user message
exports.createMessage = async (chatId, prompt) => {
  const newMessage = new Message({
    chatSessionId: chatId,
    role: "user",
    prompt,
  });
  await newMessage.save();
  return { newMessageId: newMessage._id };
};

// Generate React component + explanation
exports.generateComponent = async (chatId, message) => {
  try {
    const combinedPrompt = `
Generate a React component based on this message: ${JSON.stringify(message)}.
Also explain the component features in 3 concise bullet points.
Return JSON with keys "explanation" (array of strings) and "code" (string).
Use valid JSON only.
    `;

    const aiResult = await aiGenerate(combinedPrompt);
    const { explanation, code } = parseMarkdownJSON(aiResult);

    const newAiMessage = new Message({
      chatSessionId: chatId,
      role: "assistant",
      explanation,
      component: { code, sandboxUrl: "" }, // Add real sandbox URL if needed
    });

    await newAiMessage.save();
    return { newAiMessageId: newAiMessage._id };
  } catch (error) {
    console.error("AI generation failed:", error);
    return { error: error.message };
  }
};
