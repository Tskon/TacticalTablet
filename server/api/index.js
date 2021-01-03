const express = require('express')
const router = express.Router()

const tablet = require('./tablet')

router.post('/tablet', tablet.create)

module.exports = router