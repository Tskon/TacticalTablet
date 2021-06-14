import express from 'express'
import tablet from './tablet.js'
import createWebSocketServer from '../ws.js'

const router = express.Router()

router.post('/tablet', tablet.create)
router.get('/tablet', tablet.get)

router.get('/createWs', (req, res) => {
  createWebSocketServer(req.query.tabletId)
  res.send({status: 'ok'})
});

export default router
