process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../src/server/app');
var User = require('../src/server/models/user');
var BEA_id = process.env.BEA_ID;
var CENS_id = process.env.CENS_ID;
var should = chai.should();
chai.use(chaiHttp);


describe('Testing Query Routes', function() {

  it('should list denver county age demographic', function(done) {
    chai.request(server)
      .get('/query/census/county')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0][0].should.equal('state');
        res.body[0][1].should.equal('county');
        res.body[1][0].should.equal('08');
        res.body[1][1].should.equal('031');
        done();
      });
  });

  it('should get bea job data', function(done) {
    var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=EMP000_SI&Year=2014&GeoFips=STATE&ResultFormat=json'
    chai.request(server)
      .get('/query/bea/job')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('BEAAPI');
        res.body.BEAAPI.Results.should.have.property('Data');
        res.body.BEAAPI.Results.Statistic.should.equal('Total employment');
        done();
      });
  });

  it('should get bea population data', function(done) {
    var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=POP_SI&Year=2014&GeoFips=STATE&ResultFormat=json';
    chai.request(server)
      .get('/query/bea/population')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('BEAAPI');
        res.body.BEAAPI.Results.should.have.property('Data');
        res.body.BEAAPI.Results.Statistic.should.equal('Population');
        done();
      });
  });

  it('should get bea personal income data', function(done) {
    var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=PCPI_SI&Year=2014&GeoFips=STATE&ResultFormat=json';
    chai.request(server)
      .get('/query/bea/personal-income')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('BEAAPI');
        res.body.BEAAPI.Results.should.have.property('Data');
        res.body.BEAAPI.Results.Statistic.should.equal('Per capita personal income');
        done();
      });
  });

  it('should get bea gdp', function(done) {
    var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=GDP_SP&Year=2014&GeoFips=STATE&ResultFormat=json';
    chai.request(server)
      .get('/query/bea/gdp')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('BEAAPI');
        res.body.BEAAPI.Results.should.have.property('Data');
        res.body.BEAAPI.Results.Statistic.should.equal('GDP in current dollars');
        done();
      });
  });

});
