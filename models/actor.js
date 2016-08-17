//require mongoose
var mongoose = require('mongoose');

var actorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please fill email"],
    match: /.+\@.+\..+/
  },
  age: {
    type: Number,
    index: true,
    min: [0, "Can't be negative"]
  },
  website: {
    type: String,
    trim: true,
    get: function(url){
        if(!url) return url;
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
          url = 'http://' + url;
        }
        return url;
    }
  }
},
  {
    timestamps: {}
  }
);


actorSchema.query = {
  byName: function(name){
    return this.find({
      $or: [
        {firstName: new RegExp(name, 'i')},
        {lastName: new RegExp(name, 'i')}
      ]
    });
  }
};
//register the getter

actorSchema.set('toJSON', { getters: true } );
actorSchema.virtual('fullName')
.get(function(){
  return this.firstName + " " + this.lastName;
})
.set(function(fullName){
  var splitName = fullName.split(" ");
  this.firstName = splitName[0];
  this.lastName = splitName[1];
});



//register the Schema
var Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
