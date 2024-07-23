const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific project
router.get('/:id', getProject, (req, res) => {
  res.json(res.project);
});

// UPDATE a project
router.patch('/:id', getProject, async (req, res) => {
  if (req.body.name != null) {
    res.project.name = req.body.name;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.project.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.project.endDate = req.body.endDate;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project
router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific project by ID
async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

module.exports = router;