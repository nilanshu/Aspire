const loanService = require('../services/loan.js')


const createLoanRequest = async (req, res) => {
    const userId = req.user.id
    const amount = req.body.amount
    const term = req.body.term
    try {
        const {status, code, data, message} = await loanService.createLoanRequest(userId, amount, term)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in creating loan request: amount-${amount}, term-${term} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const approveLoan = async (req, res) => {
    const loanId = req.params.id
    const loanStatus = req.body.status
    const approverId = req.bankStaff.id
    try {
        const {status, code, data, message} = await loanService.approveLoan(loanId, loanStatus, approverId)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in approving loan request: loanId-${loanId}, loanStatus-${loanStatus} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const getUserLoans = async (req, res) => {
    const userId = req.user.id
    try {
        const {status, code, data, message} = await loanService.getUserLoans(userId)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in fetching user loans: userId-${userId}`, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const getLoanRepayments = async (req, res) => {
    const loanId = req.query.loanId
    try {
        const {status, code, data, message} = await loanService.getLoanRepayments(loanId)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in fetching loan repayments: loanId-${loanId}`, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const payRepayment = async (req, res) => {
    const repaymentId = req.params.id
    const amount = req.body.amount
    try {
        const {status, code, data, message} = await loanService.payRepayment(repaymentId, amount)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in paying loan repayment: repaymentId-${repaymentId}, amount-${amount}`, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

module.exports = {
    createLoanRequest,
    approveLoan,
    getUserLoans,
    getLoanRepayments,
    payRepayment
}