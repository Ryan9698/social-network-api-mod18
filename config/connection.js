const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialapi', {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
