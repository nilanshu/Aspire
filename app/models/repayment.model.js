const {REPAYMENT_STATUS} = require('../utils/constants')


module.exports = (sequelize, Sequelize) => {
    const repayment = sequelize.define("repayment", {
        loanId: {
            type: Sequelize.INTEGER(16),
            references: {
                model: 'loan',
                key: 'id'
            }
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
        },
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'repayment',
        associate: function (models) {
            repayment.belongsTo(models.loan, {foreignKey: 'loanId'});
            models.loan.hasMany(repayment, {foreignKey: 'loanId'});
        }
    })

    return repayment
}