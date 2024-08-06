const express = require('express');

const Task = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.getAll()

        const formattedTasks = tasks.map(task => ({
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: Boolean(task.task_completed),
            project_name: task.project_name,
            project_description: task.project_description
          }))

      res.json(formattedTasks)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "not working "})
    }
  })

  router.post('/', async (req, res) => {
    try {
        const newTask = await Task.add(req.body); // Pass the request body to the add function
        res.status(201).json({
          ...newTask,
          task_completed: Boolean(newTask.task_completed), // Ensure it's returned as a boolean
        });
      } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error adding new task' }); // Return an error message
      }
    
  })

module.exports = router;
