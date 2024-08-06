const express = require('express')
const projectRouter = require('./project/router')
const resourceRouter = require('./resource/router')

const server = express()

server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/resources', resourceRouter)

module.exports = server