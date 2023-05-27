const bcrypt = require("bcryptjs")
const uuid = require('uuid')
const db = require("../models")
const User = db.users

// Magic Values
const salt = "A$pIre"


const signup = async (name, email, userName, password) => {
    if (!name || !email || !userName || !password) {
        return {status: false, code: 400, message: "amount and term are mandatory"}
    }

    // Check if a user with given email already exists
    let user = await User.findOne({where: {email: email}, raw: true})
    if (user) {
        return {status: false, code: 400, message: `User with email ${email} already exists`}
    }

    // create a hashedPassword
    const saltedPassword = userName + password + salt
    let hashedPassword = await bcrypt.hash(saltedPassword, 8)

    // create session key
    const sessionKey = uuid.v4()

    let userData = { name, email, userName, password: hashedPassword, sessionKey}

    const data = await User.create(userData)
    return {status: true, code: 201, data}
}

module.exports = {
    signup
}