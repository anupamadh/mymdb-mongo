var config = require('./config/config');
var mongoose = require('./config/mongoose');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.db);
var jwt_secret = 'whateversuperduperwho';
//requiring the Movie module
var db = mongoose();
var Movie = require('./models/movie');
var Actor = require('./models/actor');
var User = require('./models/user');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
//require express module
var express = require('express');
var app = express();

//set up port
var port = process.env.PORT || 5000;
app.set('port', port);

//set all the middlewares
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//let's set the routes to list all the movies
//express-jwt
app.use(expressJWT({
secret: jwt_secret
})
.unless({
  path: ['/signup', '/login']
})
);

//list all movies
console.log(1);

//movie MDB API Models list


//signup
app.post('/signup', function(req, res) {

  //set var for the posted request
  var user_object = req.body;
  //set new user object
  var new_user = new User(user_object);
  //save the new user object
  new_user.save(function(err, user) {
    if (err) return res.status(400).send(err);
    return res.status(200).send({
      message: 'user created'
    });
  });
});


app.post('/login', function(req, res) {

  var loggedin_user = req.body;
  User.findOne(loggedin_user, function(err, found_user) {
    if (err) return res.status(400).send('invalid username and password');
    if (found_user) {
      var payload = found_user.id;
      var jwt_token = jwt.sign(payload, jwt_secret);
      return res.status(200).send(jwt_token);
    } else {
      return res.status(400).send({
        message: 'login failed'})
    }
  });
})

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
  // .get(function(req, res, next) {
  //   var actor_id = req.params.actor_id;
  //   Actor.findOne({
  //     _id: actor_id
  //   }, function(err, actor) {
  //     if (err) return next(err);
  //     res.json(actor);
  //   });
  // })
  .get(function(req, res, next) {
    var actor_name = req.params.actor_id;
    Actor.find().byName(actor_name).exec(function(err, actor) {
      if (err) return next(err);
      res.json(actor);
    });
  })

.put(function(req, res, next) {
    // console.log(req.body);
    var actor_id = req.params.actor_id;

    Actor.findByIdAndUpdate(actor_id, req.body, function(err, actor) {
      if (err) res.status(400).send(err);
      Actor.findOne({
        _id: actor_id
      }, function(err, actor) {
        res.json(actor);
      });
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
  .post(function(req, res, next) {
    var new_actor = new Actor(req.body);
    new_actor.save(function(err) {
      // if(err) return next(err);
      var err_message = {
        "message": err.errors.email.message,
        "status_code": 400
      };
      // console.log('error message is: ', err.errors.email.message);
      if (err) return res.status(400).send(err_message.message);
      res.json(new_actor);
    });
  });


//listening to port
app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});
console.log(3);

module.exports = app;
