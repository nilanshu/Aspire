const userService = require('../services/user')


const signup = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try {
        const {status, code, data, message} = await userService.signup(name, email, password)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in user signup: name-${name}, email-${email} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const {status, code, data, message} = await userService.login(email, password)
        res.status(code).send({status, ...(data && {data}), ...(message && {message})})
    } catch (error) {
        console.error(`Error in user login: userName-${email} `, error.message)
        res.status(500).send({status: false, message: error.message})
    }
}

module.exports = {
    signup,
    login
}