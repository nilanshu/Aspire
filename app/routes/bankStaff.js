const express = require('express')
const router = express.Router()
const bankStaffController = require('../controllers/bankStaff')


router.post('/bank-staff/signup', bankStaffController.signup)
router.post('/bank-staff/login', bankStaffController.login)

module.exports = router