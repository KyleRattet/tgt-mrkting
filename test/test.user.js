process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../src/server/app');
var User = require('../src/server/models/user');

var should = chai.should();
chai.use(chaiHttp);




xdescribe('Testing Main User Routes', function() {

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
        res.body[0].queries[0].should.have.property('url');
        res.body[0].queries[0].name.should.equal('Test1');
        res.body[0].queries[0].url.should.equal('http://testqueryforTest1');
        res.body[0].queries[2].url.should.equal('http://testqueryforTest3');
        done();
      });
  });

  it('should list one user on /<id> GET', function(done) {
    var newUser = new User({
      name:  "Jane Doe",
      username: "Jane_Doe",
      email: 'janedoe@test.com',
      password: 'testjane',
      githubProfileID:'JaneDoe',
      googleProfileID: 'JaneDoe',
      queries: [ {
        name: 'TestJane1',
        url: 'http://testqueryforTest1Jane'
        },
        {
        name: 'TestJane2',
        url: 'http://testqueryforTest2Jane'
        },
        {
        name: 'TestJane3',
        url: 'http://testqueryforTest3Jane'
        }]
    });
    newUser.save(function(err, data) {
      chai.request(server)
        .get('/users/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          console.log(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('username');
          res.body.should.have.property('githubProfileID');
          res.body.should.have.property('googleProfileID');
          res.body.should.have.property('queries');
          res.body.name.should.equal('Jane Doe');
          res.body.email.should.equal('janedoe@test.com');
          res.body.googleProfileID.should.equal('JaneDoe');
          res.body.username.should.equal('Jane_Doe');
          res.body.queries.should.be.a('array');
          res.body.queries[0].should.have.property('name');
          res.body.queries[0].should.have.property('url');
          res.body.queries[0].name.should.equal('TestJane1');
          res.body.queries[0].url.should.equal('http://testqueryforTest1Jane');
          res.body.queries[2].url.should.equal('http://testqueryforTest3Jane');
          done();
        });
    });
  });

  it("should update a query for a user on /user/id/addquery PUT", function(done){
  chai.request(server)
    .get('/users')
    .end(function(err, res, data){
      chai.request(server)
        .put('/users/addquery')
        .send({
          'name': 'Test Query 14',
          'url': "http://testquery1"
          })
        .end(function(error, response){
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;

          // response.body.should.be.a('object');
          // response.body.should.have.property('UPDATED');
          // response.body.UPDATED.should.be.a('object');
          // response.body.UPDATED.should.have.property('name');
          // response.body.UPDATED.should.have.property('_id');
          // response.body.UPDATED.name.should.equal('Google Inc.');
          // response.body.UPDATED.shares.should.equal(200);
          // response.body.UPDATED.costBasis.should.equal(670);
          done();
      });
    });
  });

  // it('should add a query to a user', function(done) {
  //   chai.request(server)
  //     .get('/users/'+data.id +'/add-query')
  //     .end(function(err, res){
  //       console.log(res.body)
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       done();
  //     });
  // });

  // it('should add a SINGLE query on POST', function(done) {
  // chai.request(server)
  //   .post('/users/'+data.id +'/add-query')
  //   .send({'name': 'John Dow', 'ticker': 'AMZN'})
  //   .end(function(err, res){
  //     res.should.have.status(200);
  //     res.should.be.json;
  //     console.log(req.body);
  //     done();
  //   });
  // });

});

describe('Testing Query Routes', function() {

  it('should list national data on age demographic', function(done) {
    chai.request(server)
      .get('/query/census/national')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0][0].should.equal('NAME');
        res.body[0][1].should.equal('DP05_0004PE');
        res.body[0][2].should.equal('DP05_0005PE');
        res.body[1][0].should.equal('United States');
        res.body[1][1].should.equal('6.3');
        done();
      });
  });

  it('should list the state of colorado data on age demographic', function(done) {
    chai.request(server)
      .get('/query/census/state')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0][0].should.equal('NAME');
        res.body[0][1].should.equal('DP05_0004PE');
        res.body[0][2].should.equal('DP05_0005PE');
        res.body[1][0].should.equal('Colorado');
        res.body[1][1].should.equal('6.3');
        res.body[1][3].should.equal('6.8');
        done();
      });
  });


  it('should list denver county age demographic', function(done) {
    chai.request(server)
      .get('/query/census/county')
      .end(function(err, res){
        res.should.have.status(200);
        console.log(res.body);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0][0].should.equal('NAME');
        res.body[0][1].should.equal('DP05_0004PE');
        res.body[0][2].should.equal('DP05_0005PE');
        res.body[1][0].should.equal('Denver County, Colorado');
        res.body[1][1].should.equal('7.0');
        res.body[1][3].should.equal('5.4');
        done();
      });
  });

});
