const bcrypt = require("bcryptjs")
const uuid = require('uuid')
const db = require("../models")
const BankStaff = db.bankStaff


const signup = async (name, email, password) => {
    if (!name || !email || !password) {
        return {status: false, code: 400, message: "name, email, and password are mandatory"}
    }

    // Check if a bank staff with given email already exists
    let staff = await BankStaff.findOne({where: {email: email}, raw: true})
    if (staff) {
        return {status: false, code: 400, message: `Bank staff with email ${email} already exists`}
    }

    // create a hashedPassword
    let hashedPassword = await bcrypt.hash(password, 8)

    // create session key
    const sessionKey = uuid.v4()

    let userData = {name, email, password: hashedPassword, sessionKey}

    const data = await BankStaff.create(userData)
    return {status: true, code: 201, data}
}

const login = async (email, password) => {
    if (!email || !password) {
        return {status: false, code: 400, message: "email and password are mandatory"}
    }

    let bankStaff = await BankStaff.findOne({where: {email}, raw: true})
    if (!bankStaff) {
        return {status: false, code: 400, message: `bank staff with email ${email} doesn't exist`}
    }
    const hash = bankStaff["password"]
    const sessionKey = bankStaff["sessionKey"]

    const isValidPassword = await bcrypt.compare(password, hash)

    if (!isValidPassword) {
        return {status: false, code: 400, message: `Invalid password`}
    }

    const data = {email, sessionKey}

    return {status: true, code: 200, data}
}

module.exports = {
    signup,
    login
}