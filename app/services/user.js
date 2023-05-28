const bcrypt = require("bcryptjs")
const uuid = require('uuid')
const db = require("../models")
const User = db.users


const signup = async (name, email, password) => {
    if (!name || !email || !password) {
        return {status: false, code: 400, message: "name, email, and password are mandatory"}
    }

    // Check if a user with given email already exists
    let user = await User.findOne({where: {email: email}, raw: true})
    if (user) {
        return {status: false, code: 400, message: `User with email ${email} already exists`}
    }

    // create a hashedPassword
    let hashedPassword = await bcrypt.hash(password, 8)

    // create session key
    const sessionKey = uuid.v4()

    let userData = {name, email, password: hashedPassword, sessionKey}

    const data = await User.create(userData)
    return {status: true, code: 201, data}
}

const login = async (email, password) => {
    if (!email || !password) {
        return {status: false, code: 400, message: "email and password are mandatory"}
    }

    let user = await User.findOne({where: {email}, raw: true})
    if (!user) {
        return {status: false, code: 400, message: `user with email ${email} doesn't exist`}
    }
    const hash = user["password"]

    const isValidPassword = await bcrypt.compare(password, hash)

    if (!isValidPassword) {
        return {status: false, code: 400, message: `Invalid password`}
    }

    const sessionKey = uuid.v4()
    await User.update({sessionKey}, {where: {email}})

    const data = {email, sessionKey}

    return {status: true, code: 200, data}
}

module.exports = {
    signup,
    login
}