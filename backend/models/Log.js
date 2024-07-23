const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Log', LogSchema);