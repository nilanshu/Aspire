const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loan')


router.post('/loan', loanController.createLoanRequest)
router.patch('/loans/:id/approve', loanController.approveLoan)

module.exports = router