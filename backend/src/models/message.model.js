const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.role === "user";
    },
  },
  explanation: {
    type: String,
    required: function () {
      return this.role === "assistant";
    },
  },
  component: {
    type: String,
    required: function () {
      return this.role === "assistant";
    },
  },
  config: {
    componentType: {
      type: String,
      required: function () {
        return this.role === "assistant";
      },
    },
    framework: {
      type: String,
      required: function () {
        return this.role === "assistant";
      },
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Message", messageSchema);
