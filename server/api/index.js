import express from 'express'
import tablet from './tablet.js'
import createWebSocketServer from '../ws.js'

const router = express.Router()

router.post('/tablet', tablet.create)
router.get('/tablet', tablet.get)
router.get('/tablet-list', tablet.getList)

router.post('/createWs', (req, res) => {
  createWebSocketServer(req.body.tabletId)
  res.send()
})

export default router
