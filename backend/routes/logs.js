const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// GET all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().populate('projectId', 'name');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new log
router.post('/', async (req, res) => {
  const log = new Log({
    description: req.body.description,
    hours: req.body.hours,
    date: req.body.date,
    category: req.body.category,
    projectId: req.body.projectId,
  });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific log
router.get('/:id', getLog, (req, res) => {
  res.json(res.log);
});

// UPDATE a log
router.patch('/:id', getLog, async (req, res) => {
  if (req.body.description != null) {
    res.log.description = req.body.description;
  }
  if (req.body.hours != null) {
    res.log.hours = req.body.hours;
  }
  if (req.body.date != null) {
    res.log.date = req.body.date;
  }
  if (req.body.category != null) {
    res.log.category = req.body.category;
  }
  if (req.body.projectId != null) {
    res.log.projectId = req.body.projectId;
  }

  try {
    const updatedLog = await res.log.save();
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a log
router.delete('/:id', getLog, async (req, res) => {
  try {
    await res.log.remove();
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific log by ID
async function getLog(req, res, next) {
  let log;
  try {
    log = await Log.findById(req.params.id);
    if (log == null) {
      return res.status(404).json({ message: 'Log not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.log = log;
  next();
}

module.exports = router;