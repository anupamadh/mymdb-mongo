var config = require('./config'),
  mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../models/actor');
  require('../models/movie');
  return db;
};
