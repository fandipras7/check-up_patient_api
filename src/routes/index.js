const express = require('express')
const router  = express.Router()
const checkupRoute = require('./checkup')

router.use('/checkup', checkupRoute)

module.exports = router