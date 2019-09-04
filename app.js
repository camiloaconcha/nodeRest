const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({"message": "Hey Welcome!"});
});
app.get('/hello', (req, res) => {
    res.json({"message": "Hey hello!"});
});

app.listen(22001, () => {
    console.log('Listening at :22001...');
})
