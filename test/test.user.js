process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../src/server/app');
var User = require('../src/server/models/user');

var should = chai.should();
chai.use(chaiHttp);


describe('User Routes', function() {

   it('should list ALL users', function(done) {
    chai.request(server)
      .get('/users/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

});
