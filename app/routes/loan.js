import express from 'express'
const router = express.Router()
import * as loanController from '../controllers/loan.js'

router.post('/loan', loanController.createLoanRequest)

export default router