const mongoose = require('mongoose');
const URL = 'mongodb://127.0.0.1:27017/betting'

mongoose.Promise = Promise;

// Connect MongoDB at default port 27017.
mongoose.connect( URL )
    .then((res) => console.log("Connected to product db"))
    .catch((err) => console.log(err))


module.exports.Sporty = require('./Sporty');