const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loan')
const authMiddleware = require('../middlewares/auth')


router.post('/loan', authMiddleware.userAuthentication, loanController.createLoanRequest)
router.patch('/loans/:id/approve', authMiddleware.bankStaffAuthentication, loanController.approveLoan)
router.get('/loans', authMiddleware.userAuthentication, loanController.getUserLoans)
router.get('/repayments', authMiddleware.userAuthentication, loanController.getLoanRepayments)
router.patch('/repayments/:id/pay', authMiddleware.userAuthentication, loanController.payRepayment)


module.exports = router