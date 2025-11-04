const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./Routes/TaskRouter');

// ✅ Load environment variables first
dotenv.config();

// ✅ Then connect to MongoDB
require('./config/db'); 

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
