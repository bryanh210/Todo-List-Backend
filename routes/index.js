var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');
var Item = require('../models/models.js').Item;
//read the doc next time
var id = mongoose.Types.ObjectId();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose')
});

//can change id to _id by mapping it

/* GET home page. */
router.get('/', cors(),function(req, res, next) {
  res.render('index',
   {layout: 'layout'});
});

//routes for save
// this is front-end sending info to backend
// router.post('/newitem', function(req, res, next) {
//   var item = new Item({
//     text: req.body.text,
//     completed: false,
//     // id: req.item.id
//   })
//   item.save((err,item)=>{
//     if(err){
//       console.log('line 19 err', err)
//     }
//     else{
//       console.log(item, 'success')
//     }
//   })
// });

// backend
//when the content's in the body, use POST
//front end doesnt know the id
//This is wrong
// router.post('/create', function(req,res,next){
//   Mongoose.findbyId(req.params.id, function(err,item){
//     if(err){
//       console.log('line 31 err', err)
//     } else{
//       console.log(item, 'success')
//     }
//   })
// });

//front end only send you the "text"
// when the content's in the body, use POST
router.post('/create', cors(), function(req, res, next) {
  //gotta console.log to see if it works. Otherwise have to send a json object back
  // console.log(req.body.text)

  var item = new Item({
    text: req.body.text,
    // completed: false,
    // id: req.item.id
  })
  item.save((err,item)=>{
    if(err){
      console.log('line 19 err', err)
    }
    else{
      //{item} is the object
      res.json({item});
      console.log('new item created')
    }
  })
});


router.get('/todos', cors(), function(req,res,next){
  Item.find({},function(err,items){
    if(err){
      console.log('line 46 err', err)
    } else{
      // if you delete the item, how can it still have the id?
      res.json({items});
    }
  })
});



// routes for remove



//backend
router.post('/remove/:id', cors(), function(req,res,next){
  // console.log('req.params.id');
  // console.log(req.params._id);

  Item.remove({_id: req.params.id }, function(err,item){
    if(err){
      console.log('line 46 err', err)
    } else{
      // if you delete the item, how can it still have the id?
      res.json({item});
    }
  })
});

// routes for completed actions
//backend
router.post('/completed/:id', cors(), function(req,res,next){
  console.log(req.params.id, 'lol');
  Item.findByIdAndUpdate(req.params.id,{
    //req.body.text is because this is what the user enters in
    //completed= true
    completed: true
    // new: true. send back to postman the new item
    // but it changes the item regardless
  }, {new: true},
    //req.item.id because id is automatically assigned by Mongose
    // id: req.item.id,
    function(err,item) {
      if(err){
        console.log('err', err)
      } else {
        res.json({item})
      }
    }
  )
});

//meaning?
module.exports = router;
