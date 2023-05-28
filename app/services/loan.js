const db = require("../models")
const Loan = db.loans
const Repayment = db.repayments
const {LOAN_STATUS} = require('../utils/constants')


const createLoanRequest = async (userId, amount, term) => {
    if (!userId || !amount || !term) {
        return {status: false, code: 400, message: "amount and term are mandatory"}
    }

    let loanData = { userId, amount, term }

    const data = await Loan.create(loanData)
    return {status: true, code: 201, data}
}

const approveLoan = async (loanId, loanStatus) => {
    if (!loanId || !loanStatus) {
        return {status: false, code: 400, message: "loanId and loanStatus are mandatory"}
    }

    if (loanStatus === LOAN_STATUS.APPROVED) {
        let loan = await Loan.findByPk(loanId)
        loan = JSON.parse(JSON.stringify(loan))
        const amount = loan["amount"]
        const term = loan["term"]
        const installmentAmount = term ? amount/term : 0
        const repaymentData = {loanId, amount: installmentAmount}

        const repaymentPromises = []

        for (let i = 0; i < term; i++) {
            repaymentPromises.push(Repayment.create(repaymentData))
        }
        await Promise.all(repaymentPromises)
    }

    const data = await Loan.update({status: loanStatus}, {where: {id: loanId}})
    return {status: true, code: 200, data}
}

module.exports = {
    createLoanRequest,
    approveLoan
}