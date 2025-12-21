const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/api', require('./src/routes/auth.routes'));
app.use('/api', require('./src/routes/message.routes'));
app.use('/api', require('./src/routes/ai.routes'));
app.use('/api', require('./src/routes/favourite.routes'));
app.use('/api', require('./src/routes/component.routes'));
app.use('/api', require('./src/routes/sandbox.routes'));
app.use('/api', require('./src/routes/chat.routes'));
app.use('/api', require('./src/routes/usage.routes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});