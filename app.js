'use strict';

import express from 'express'
import loanRouter from './app/routes/loan.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb',extended: true}))

app.use(loanRouter)

app.listen(port, () => console.log(`Express app running on port ${port}!`))
