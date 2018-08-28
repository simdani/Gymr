const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const app = express();

// connect with mongoose to mongodb
mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

// load routes
const gyms = require('./routes/api/gyms');

let port;
if (config.util.getEnv('NODE_ENV') !== 'test') {
    port = process.env.PORT || 5000;
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

} else {
    port = 5002;
}

// bodyparse middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// handle routes
app.use('/api/gyms', gyms);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
