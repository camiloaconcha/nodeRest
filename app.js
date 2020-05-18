const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({ message: 'Hey Welcome!' });
});
app.get('/hello', (req, res) => {
    res.json({ message: 'Hey hello!' });
});

require('./routes/coctel.routes.js')(app);

app.listen(22001, () => {
    console.log('Listening at :22001...');
});
