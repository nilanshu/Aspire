const {REPAYMENT_STATUS} = require('../utils/constants')


module.exports = (sequelize, Sequelize) => {
    const Repayment = sequelize.define("repayment", {
        loanId: {
            type: Sequelize.INTEGER(16)
        },
        amount: {
            type: Sequelize.DECIMAL(10, 5)
        },
        status: {
            type: Sequelize.ENUM(
                REPAYMENT_STATUS.PENDING,
                REPAYMENT_STATUS.PAID),
            allowNull: false,
            defaultValue: REPAYMENT_STATUS.PENDING
        }
    })

    return Repayment
}