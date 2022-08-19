const express = require('express')
const router = express.Router()
const checkupController = require('../controller/checkup')

router
  .post('/', checkupController.insertData)
  .get('/', checkupController.getDataPatient)
  .put('/:id/update-status', checkupController.updateDataPatient)

module.exports = router

