const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./db/db.json')

const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

