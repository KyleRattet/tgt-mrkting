var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose-q')(require('mongoose'));

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





module.exports = router;
