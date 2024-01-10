const mongoose = require('mongoose');

//Need to add local connection
mongoose.connect('mongodb://127.0.0.1:27017/');

module.exports = mongoose.connection;
