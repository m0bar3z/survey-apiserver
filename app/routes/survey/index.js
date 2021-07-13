const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const authError = require('../middleware/authError')

const v1 = require('./v1')

router.use('/v1', v1)

module.exports = router