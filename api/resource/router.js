const express = require('express')
const Resource = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const resources = await Resource.getAll()
        if (!resources.length) {
            return res.status(404).json({ message: 'No resources found' })
        }
        res.json(resources)
    } catch (err) {
        next (err) 
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { resource_name, resource_description } = req.body

        if (!resource_name) {
            return res.status(400).json({ message: 'Resource name is required' })
        }

        const existingResource = await Resource.findByName(resource_name)
        if (existingResource) {
            return res.status(409).json({ message: 'Resource name already exists' })
        }

        const newResource = { resource_name, resource_description }
        const createdResource = await Resource.add(newResource)

        res.status(201).json(createdResource)
    } catch (err) {

    }
})

module.exports = router
