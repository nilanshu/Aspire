'use strict'

const express = require('express')
const db = require("./app/models")
const bankStaffRouter = require('./app/routes/bankStaff.js')
const loanRouter = require('./app/routes/loan.js')
const userRouter = require('./app/routes/user.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bankStaffRouter)
app.use(loanRouter)
app.use(userRouter)

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.listen(port, () => console.log(`Express app running on port ${port}!`))
