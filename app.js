const express = require('express')
const Book = require('./models/bookModel')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/bookRouter')(Book)

var app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/bookAPI', {
    useNewUrlParser: true
})
var port = 3000;

app.get('/', (req, res) => {
    res.send('I am great')
})


app.listen(port, () => {
    console.log('Running on port' + port)
})

app.use('/api', router)

module.exports = app