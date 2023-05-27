module.exports = (sequelize, Sequelize) => {
    const Loan = sequelize.define("loan", {
        amount: {
            type: Sequelize.INTEGER(16),
            defaultValue: 0
        },
        term: {
            type: Sequelize.INTEGER(6)
        },
        status: {
            type: Sequelize.ENUM('PENDING','APPROVED', 'REJECTED'),
            allowNull: false,
            defaultValue: 'PENDING'
        }
    })

    return Loan
}