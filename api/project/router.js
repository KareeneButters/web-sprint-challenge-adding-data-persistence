const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.getAll()

        const transformedProjects = projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed)
          }))
        res.json(transformedProjects)
    } catch (err) {
        next (err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { project_name, project_description, project_completed } = req.body

        if (!project_name) {
            return res.status(400).json({ message: 'Project name is required' });
          }
          const newProject = {
            project_name,
            project_description,
            project_completed: project_completed !== undefined ? project_completed : false,
          }
          const createdProject = await Projects.add(newProject)

          createdProject.project_completed = Boolean(createdProject.project_completed)

          res.status(201).json(createdProject)
    } catch (err) {
        next(err)
    }
})

module.exports = router 
