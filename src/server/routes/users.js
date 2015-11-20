var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose-q')(require('mongoose'));

var User = require('../models/user.js');


router.get('/users', function(req, res, next){
  User.findQ({})
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    res.send(err);
  });
});





module.exports = router;
