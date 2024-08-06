const express = require('express');
const db = require('../../data/dbConfig')
const Task = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.getAll()

      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  })

  router.post('/', async (req, res) => {
    try {
        const { task_notes, task_description, task_completed, project_id } = req.body

        const newTask = {
            task_notes,
            task_description,
            task_completed: task_completed !== undefined ? task_completed : false,
            project_id,
        }
        const createdTask = await Task.add(newTask)
        res.status(201).json(createdTask)
    } catch (err) {
      res.status(500).json({ message: 'Error adding new task' })
    }
  })

module.exports = router;
