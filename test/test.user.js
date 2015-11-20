process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../src/server/app');
var User = require('../src/server/models/user');

var should = chai.should();
chai.use(chaiHttp);




describe('User Routes', function() {

  User.collection.drop();


  beforeEach(function(done){
    var newUser = new User({
      name:  "John Doe",
      username: "John_Doe",
      email: 'jdoe@test.com',
      password: 'test',
      githubProfileID:'JohnDoe',
      googleProfileID: 'JonathonDoe',
      queries: [ {
        name: 'Test1',
        url: 'http://testqueryforTest1'
        },
        {
        name: 'Test2',
        url: 'http://testqueryforTest2'
        },
        {
        name: 'Test3',
        url: 'http://testqueryforTest3'
        }]
    });
    newUser.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

   it('should list ALL users', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

});
