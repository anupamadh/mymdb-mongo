//requiring the Movie module
var Movie = require('./models/movie');
var Actor = require('./models/actor');

var bodyParser = require('body-parser');
//require express module
var express = require('express');
var app = express();

//set up port
var port = 5000;
app.set('port', port);

//set all the middlewares
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//let's set the routes to list all the movies

//list all movies
console.log(1);

app.route('/movies/:movie_id')
  .get(function(req, res, next) {
    var movie_id = req.params.movie_id;
    Movie.findOne({
      _id: movie_id
    }, function(err, movie) {
      if (err) return next(err);
      res.json(movie);
    });
  })
  .put(function(req, res) {
    var movie_id = req.params.movie_id;
    Movie.findByIdAndUpdate(movie_id, req.body, function(err, movie) {
      if (err) return next(err);
      res.json(movie);
    });
  })
  .delete(function(req, res) {
    var movie_id = req.params.movie_id;
    Movie.findOneAndRemove(movie_id, req.body, function(err, movie) {
      if (err) return next(err);
      res.json(movie);
    });
  });

app.route('/movies')
  .get(function(req, res) {
    Movie.find({}, function(err, movies) {
      if (err) return next(err);
      res.json(movies);
    });
  })
  .post(function(req, res, next) {
    console.log(req.body);
    var new_movie = new Movie(req.body);
    new_movie.save(function(err) {
      if (err) return next(err);
      res.json(new_movie);
    });
  });


app.route('/actors/:actor_id')
  .get(function(req, res, next) {
    var actor_id = req.params.actor_id;
    Actor.findOne({
      _id: actor_id
    }, function(err, actor) {
      if (err) return next(err);
      res.json(actor);
    });
  })

.put(function(req, res) {
  var actor_id = req.params.actor_id;
  Actor.findByIdAndUpdate(actor_id, req.body, function(err, actor) {
    if (err) return next(err);
    res.json(actor);
  });
})
.delete(function(req, res) {
  var actor_id = req.params.actor_id;
  Actor.findOneAndRemove(actor_id, req.body, function(err, actor) {
    if (err) return next(err);
    res.json(actor);
  });
});

app.route('/actors')
  .get(function(req, res) {
    Actor.find({}, function(err, actors) {
      if (err) return next(err);
      res.json(actors);
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    var new_actor = new Actor(req.body);
    console.log(new_actor);
    new_actor.save(function(err) {
      if (err) return next(err);
      res.json(new_actor);
    });
  });


//listening to port
app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});
console.log(3);
