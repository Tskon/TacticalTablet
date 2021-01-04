import express from 'express'
import tablet from './tablet.js'

const router = express.Router()

router.post('/tablet', tablet.create)

export default router