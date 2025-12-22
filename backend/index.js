const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const messageRoutes = require("./src/routes/message.routes");
const aiRoutes = require("./src/routes/ai.routes");
const componentRoutes = require("./src/routes/component.routes");
const sandboxRoutes = require("./src/routes/sandbox.routes");
const chatRoutes = require("./src/routes/chat.routes");
const userRoutes = require("./src/routes/user.routes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);
app.use("/api", aiRoutes);
app.use("/api", componentRoutes);
app.use("/api", sandboxRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
