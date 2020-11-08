const cors = require('cors')
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

// const WebSocket = require('ws')
// const UUID = require('uuid')

// const wss = new WebSocket.Server({ port: 4321 })
// wss.on('connection', (ws) => {
//   ws.id = UUID()
//   ws.on('message', (message) => {
//     ws.send(`[${ws.id}]: ${message}`)
//   })
// })

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {console.log('connection successful')})
  .catch((err) => {console.log(err)})

const app = express()
app
  .use(cors())
  .use(fileUpload({ createParentPath: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())

  // Serve the static files from the SPA
  .use(express.static(path.resolve(__dirname, '../dist')))

  /**
   * for all the SPA stuff
   */
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })

/**
 * Listening port by express
 */
const PORT = process.env.PORT || 9978
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`ready at http://localhost:${PORT}`)
})
