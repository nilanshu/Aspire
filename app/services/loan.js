const db = require("../models")
const Loan = db.loans
const Op = db.Sequelize.Op


const createLoanRequest = async (amount, term) => {
    if (!amount || !term) {
        return {status: false, code: 400, message: "amount and term are mandatory"}
    }

    let loanData = { amount, term }

    const data = await Loan.create(loanData)
    return {status: true, code: 201, data}
}

module.exports = {
    createLoanRequest
}