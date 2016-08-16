var mongo_url = 'mongodb://localhost/mymdb_db';

//require mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect(mongo_url);

//setting up how json structure will be like
var actorSchema = new mongoose.Schema({
  name: String,
  movie: String,
  website: {
    type: String,
    set: function(url) {
      if (!url) {
        return url;
      } else {
        if (
          url.indexOf('http://') !== 0 &&
          url.indexOf('https://') !== 0
        ) {
          url = 'http://' + url
        }
        return url;
      }
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//register the getter
actorSchema.set('toJSON', { getters: true } );

//register the Schema
var Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
