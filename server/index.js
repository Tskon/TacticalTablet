import cors from 'cors'
import path from 'path'
import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {fileURLToPath} from 'url'
import api from './api/index.js'
import createWebsocketServer from './ws.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.resolve(__dirname, '../.env')})


mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {console.log('connection successful')})
  .catch((err) => {
    // TODO didnt work connection to db =(
    console.log(`connection url: ${process.env.MONGO_URL}`)
    console.log(err)
  })

const app = express()
app
  .use(cors())
  .use(fileUpload({createParentPath: true}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser())
  .use(express.static(path.resolve(__dirname, '../dist')))

  .use('/api', api)
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })

const PORT = process.env.PORT || 9978
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`ready at http://localhost:${PORT}`)
})
