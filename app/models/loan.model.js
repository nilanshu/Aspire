const {LOAN_STATUS} = require('../utils/constants')


module.exports = (sequelize, Sequelize) => {
    const loan = sequelize.define("loan", {
        amount: {
            type: Sequelize.INTEGER(16),
            defaultValue: 0
        },
        term: {
            type: Sequelize.INTEGER(6)
        },
        status: {
            type: Sequelize.ENUM(
                LOAN_STATUS.PENDING,
                LOAN_STATUS.APPROVED,
                LOAN_STATUS.REJECTED,
                LOAN_STATUS.PAID),
            allowNull: false,
            defaultValue: LOAN_STATUS.PENDING
        }
    }, {
        tableName: 'loan'
    })

    return loan
}