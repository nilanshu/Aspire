const loanService = require('../services/loan.js')


const createLoanRequest = async (req, res) => {
    const amount = req.body.amount
    const term = req.body.term
    try {
        const {status, code, data, message} = await loanService.createLoanRequest(amount, term)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in creating loan request: amount-${amount}, term-${term} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const approveLoan = async (req, res) => {
    const loanId = req.params.id
    const loanStatus = req.body.status
    try {
        const {status, code, data, message} = await loanService.approveLoan(loanId, loanStatus)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in approving loan request: loanId-${loanId}, loanStatus-${loanStatus} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

module.exports = {
    createLoanRequest,
    approveLoan
}