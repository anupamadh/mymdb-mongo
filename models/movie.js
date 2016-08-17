var mongoose = require('mongoose');
//setting up how json structure will be like
var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  publishedYear: Number,
  director: String,
  actor: String,
  published: {
    type: String,
    default: "MGM"
  },
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
movieSchema.set('toJSON', { getters: true } );

//register the Schema
var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
