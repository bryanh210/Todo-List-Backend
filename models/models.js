var mongoose = require('mongoose');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
var connect = process.env.MONGODB_URI ;
var id = mongoose.Types.ObjectId();

mongoose.connect(connect);

//schema is how data looks
//models = actual collection
var Item = mongoose.model('Item', mongoose.Schema({
  text: String,
  //boolean, not false
  // how to do default
  completed: {
    type: Boolean,
    default: false
  }
}));
//notice spacing
var models = {
  Item: Item
};

module.exports = models;
