const express = require('express')
const router = express.Router()
const bankStaffController = require('../controllers/bankStaff')


router.post('/signup', bankStaffController.signup)
router.post('/login', bankStaffController.login)

module.exports = router