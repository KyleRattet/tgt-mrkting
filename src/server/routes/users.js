var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose-q')(require('mongoose'));

var moment = require('moment');
var jwt = require('jwt-simple');
var request = require('request');
var qs = require('querystring');


var User = require('../models/user.js');

//get all users
router.get('/', function(req, res, next){
  User.findQ({})
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    res.send(err);
  });
});

//get one user
router.get('/:id', function (req, res, next) {
  User.findByIdQ(req.params.id)
  .then(function (result) { res.json(result) })
  .catch(function (err) {res.send(err) })
  .done();
});


//post to add query  to a user
// router.post('/:id/add-query', function(req, res, next){
//   var newQuery = new Query(req.body);
//   newQuery.save();

//   var id = req.params.userid;
//   var update = {$push : { queries : newQuery } };
//   var options = {new :true };
//   User.findByIdAndUpdateQ(id, update, options)
//   .then(function(result){
//     res.json(result);
//   })
//   .catch(function(err){
//     res.send({'ERROR' : err});
//   })
//   .done();
// });
router.put('/addquery', function(req, res, next){
  res.json('testing');
  // var id = _id;
  // var update = {
  //   $push: {
  //     queries:{
  //       name: req.body.name,
  //       url: req.body.url
  //     }
  //   }
  // };
  // var options = {new: true};
  // User.findOneAndUpdate(query, update, options, function(err, data){
  //   if(err){
  //     res.json({'message': err});
  //   } else {
  //     res.json({'UPDATED' : data});
  //   }
  // });
});

// router.put('/:id', function (req, res ,next){
//   var update = {
//     queries: {
//       name: req.body.name,
//       url: req.body.url
//     }
//   };
//   var options = {new:true};
//   User.findByIdAndUpdateQ(req.params.id, update, options)
//   .then(function (result) {
//     res.json({"UPDATED": result});
//     })
//   .catch(function (err) {
//     res.send(err);
//   });
// });

module.exports = router;
