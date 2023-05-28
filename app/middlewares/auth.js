const db = require("../models")
const User = db.users


exports.userAuthentication = async function (req, res, next) {
    try {
        const token = req.headers && req.headers.authorization &&
            req.headers.authorization.split("Bearer ")[1] || undefined
        if (!token) return res.status(401).send({status: false, msg: "Token not found"})

        let user = await User.findOne({where: {sessionKey: token}, raw: true})
        if (!user) return res.status(401).send({status: false, msg: "User not found"})

        req.user = user
        next()
    } catch (exception) {
        res.status(401).send({status: false, msg: "INVALID_TOKEN"})
    }
}