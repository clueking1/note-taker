const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./db/db.json')

const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (rq, rs) => rs.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/notes', (rq, rs) => rs.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes', (rq, rs) => rs.json(data))

app.post('/api/notes', (rq, rs) => {
    
    let saveInfo = {'title': rq.body.title, 'text': rq.body.text}

    data.push(saveInfo)


})

app.listen(PORT, () => console.log("http://localhost:" + PORT))