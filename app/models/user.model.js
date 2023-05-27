module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        name: {
            type: Sequelize.STRING(255),
        },
        email: {
            type: Sequelize.STRING(155),
            allowNull: true
        },
        userName: {
            type: Sequelize.STRING(255),
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        sessionKey: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'user'
    })

    return user
}