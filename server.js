const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const app = express();

// connect with mongoose to mongodb
mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

// load routes
const gyms = require('./routes/gyms');

let port;
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
    port = 5000;
} else {
    port = 5002;
}

// bodyparse middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// handle routes
app.use('/gyms', gyms);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
