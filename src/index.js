const app = require('./app')
const port = process.env.PORT

// and start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
