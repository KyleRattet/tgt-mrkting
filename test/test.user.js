process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../src/server/app');
var User = require('../src/server/models/user');

var should = chai.should();
chai.use(chaiHttp);




describe('Testing Main User Routes', function() {

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
        console.log(res.body[0].queries[0]);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('githubProfileID');
        res.body[0].should.have.property('googleProfileID');
        res.body[0].should.have.property('queries');
        res.body[0].name.should.equal('John Doe');
        res.body[0].email.should.equal('jdoe@test.com');
        res.body[0].googleProfileID.should.equal('JonathonDoe');
        res.body[0].username.should.equal('John_Doe');
        res.body[0].queries[0].should.be.a('object');
        res.body[0].queries[0].should.have.property('name');
        res.body[0].queries[0].should.have.property('url')
        res.body[0].queries[0].name.should.equal('Test1');
        res.body[0].queries[0].url.should.equal('http://testqueryforTest1');
        res.body[0].queries[2].url.should.equal('http://testqueryforTest3');
        done();
      });
  });

});
