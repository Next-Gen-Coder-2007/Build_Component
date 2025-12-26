const { GoogleGenerativeAI } = require("@google/generative-ai");
const Message = require("../models/message.model");

let lastCall = 0;
const RATE_LIMIT_INTERVAL = 1000;

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

function parseMarkdownJSON(input) {
  if (!input) return { explanation: [], code: "" };

  try {
    const cleaned = input.replace(/```json/g, "").replace(/```/g, "").trim();
    const sanitized = cleaned.replace(/[\u0000-\u001F]+/g, "");
    const data = JSON.parse(sanitized);
    return {
      explanation: Array.isArray(data.explanation) ? data.explanation : [],
      code: typeof data.code === "string" ? data.code : "",
    };
  } catch (err) {
    console.error("JSON Parse Error:", err.message);
    return { explanation: [], code: "" };
  }
}

exports.createMessage = async (chatId, prompt) => {
  const newMessage = new Message({
    chatSessionId: chatId,
    role: "user",
    prompt,
  });
  await newMessage.save();
  return { newMessage: newMessage };
};

exports.generateComponent = async (chatId, message) => {
  try {
    const combinedPrompt = `
Generate a React component based on this message: ${JSON.stringify(message)} , give me it as a single code.
Also explain the component features in 10 concise bullet points.
Return JSON with keys "explanation" (array of strings) and "code" (string).
Use valid JSON only.
    `;

    const aiResult = await aiGenerate(combinedPrompt);
    const { explanation, code } = parseMarkdownJSON(aiResult);

    const newAiMessage = new Message({
      chatSessionId: chatId,
      role: "assistant",
      explanation,
      component: { code },
    });

    await newAiMessage.save();
    return { newAiMessage: newAiMessage };
  } catch (error) {
    console.error("AI generation failed:", error);
    return { error: error.message };
  }
};
