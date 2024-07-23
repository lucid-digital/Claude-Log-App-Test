const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch((err) => console.error('MongoDB Atlas connection error:', err));

// Routes
const logRoutes = require('./routes/logs');
const projectRoutes = require('./routes/projects');

app.use('/api/logs', logRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});