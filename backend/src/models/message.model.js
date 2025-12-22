const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession",
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  prompt: {
    type: String,
    required: false,
  },
  explanation: {
    type: String,
    required: false,
  },
  component: {
    code: {
      type: String,
    },
    sandboxUrl: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Message", messageSchema);
