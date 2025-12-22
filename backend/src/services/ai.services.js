const genAI = require("@google/generative-ai");
const Message = require("../models/message.model");

const aiGenerate = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ content: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: "Server error" });
  }
}


exports.createMessage = async (message) => {
  const newMessage = new Message({
    chatSessionId: newChat._id,
    role: "user",
    prompt: message,
  });
  await newMessage.save();
  return { newMessageId: newMessage._id };
};

exports.generateComponent = async (message) => {
  const aiExplanationPrompt = `Explain the component about the features in detail in bullet points within 600 words: ${message}`;
  const aiExplanation = await aiGenerate({
    body: { chatId: newChat._id, prompt: aiExplanationPrompt },
  });
  const aiComponentPrompt = `Generate a React component based on the following explanation: ${aiExplanation.content}. Provide only the code without any explanations.`;
  const aiComponent = await aiGenerate({
    body: { chatId: newChat._id, prompt: aiComponentPrompt },
  });
  const newAiMessage = new Message({
    chatSessionId: newChat._id,
    role: "assistant",
    explanation: aiExplanation.content,
    component: { code: aiComponent.content, sandboxUrl: "URL" },
  });
  await newAiMessage.save();
  return { newAiMessageId: newAiMessage._id };
};