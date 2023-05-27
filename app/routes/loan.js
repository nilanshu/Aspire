const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loan')


router.post('/loan', loanController.createLoanRequest)

module.exports = router