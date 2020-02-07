const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./db/db.json')

const PORT = process.env.PORT || 3000 

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

    update()

    rs.json(data)

})

app.delete('/api/notes/:id', (rq, rs) => {
    const reqId = rq.params.id

    let filData = data.filter(filData => {
        return filData.id == reqId
    })[0]

    const index = data.indexOf(filData)

    data.splice(index, 1)

    update()

    rs.json(data)
    
})

const update = () => {
    data.forEach(addId(1))

    fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 4))

    function addId(id) {
        return function iter(o) {
            if ('title' in o) {
                o.id = id++
            }
            Object.keys(o).forEach(function(k){
                Array.isArray(o[k]) && o[k].forEach(iter)
            })
        }
    }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))