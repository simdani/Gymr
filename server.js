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

// test

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
