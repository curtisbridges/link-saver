const express = require('express')
require('./db/mongoose') // ensures mongoose connects, nothing else

const usersRouter = require('./routers/users')
const linksRouter = require('./routers/links')

const app = express()

app.use(express.json())

// Connect all the routers
app.use(linksRouter)
app.use(usersRouter)

module.exports = app
