export const createLoanRequest = async (amount, term) => {
    if (!amount || !term) {
        return {status: false, code: 400, message: "amount and term are mandatory"}
    }

    let loanData = { amount, term }

    /*
    const data = await loanModel.create(loanData)
    return {status: true, code: 201, data}
    */

    return {status: true, code: 201, data: loanData}
}