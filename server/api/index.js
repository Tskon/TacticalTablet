import express from 'express'
import tablet from './tablet.js'
import createWebsocketServer from '../ws.js'

const router = express.Router()

router.post('/tablet', tablet.create)

router.get('/createWs', (req, res) => {
  createWebsocketServer(req.query.tabletId)
  res.send({status: 'ok'})
});

export default router