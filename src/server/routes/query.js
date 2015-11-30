var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
var BEA_id = process.env.BEA_ID;
var CENS_id = process.env.CENS_ID;


router.get('/census/national', function(req, res, next) {
  var queryCodes = req.query.category;
  console.log(queryCodes, 'query codes');

  var url = "http://api.census.gov/data/2013/acs1/profile?get=NAME,"+queryCodes+"&for=us:*&key="+CENS_id;
  console.log(url, "url");
  http.get(url, function(response) {
      var body = '';

      response.on('data', function(chunk) {

        body += chunk;
      });

      response.on('end', function() {

        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

});

router.get('/bea/gdp', function(req, res, next) {
  var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=GDP_SP&Year=2014&GeoFips=STATE&ResultFormat=json';
  http.get(url, function(response) {
      var body = '';

      response.on('data', function(chunk) {

        body += chunk;
      });

      response.on('end', function() {

        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
});

router.get('/bea/personal-income', function(req, res, next) {
  var url = 'http://bea.gov/api/data/?UserID='+BEA_id+'-Key&method=GetData&datasetname=RegionalData&KeyCode=PCPI_SI&Year=2014&GeoFips=STATE&ResultFormat=json';
  http.get(url, function(response) {
      var body = '';

      response.on('data', function(chunk) {

        body += chunk;
      });

      response.on('end', function() {

        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
});

router.get('/census/state', function(req, res, next) {
  console.log(req.query, "state req query server side");

  var queryCodes = req.query.category;
  var state = req.query.state;
  var url = "http://api.census.gov/data/2013/acs1/profile?get=NAME,"+queryCodes+"&for=state:"+state+"&key="+CENS_id;
  console.log(url, "url state")
  http.get(url, function(response) {
      var body = '';

      response.on('data', function(chunk) {

        body += chunk;
      });

      response.on('end', function() {

        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

});

router.get('/census/county', function(req, res, next) {
  console.log(req.query, "req  county query server side");

  ///function to build up url
  // var queryBuild = ifClickedCounty(req.query);
  // console.log(queryBuild, "query string builder");
  // var state = queryBuild[0];
  // var county = queryBuild[1];
  // var queryCodes = queryBuild[2];
  // console.log(state, "state");
  // console.log(queryCodes, "query codes");

  // var url = "http://api.census.gov/data/2013/acs1/profile?get=NAME,"+queryCodes+"&for=county:"+county+"&in=state:"+state+"&key="+CENS_id;


  var url = 'http://api.census.gov/data/2013/acs1/profile?get=NAME,DP05_0004PE,DP05_0005PE,DP05_0006PE,DP05_0007PE,DP05_0008PE,DP05_0009PE,DP05_0010PE,DP05_0011PE,DP05_0012PE,DP05_0013PE,DP05_0014PE,DP05_0015PE,DP05_0016PE,DP05_0001PE&for=county:031&in=state:08&key='+CENS_id;
  console.log(url, "url");
  http.get(url, function(response) {
      var body = '';

      response.on('data', function(chunk) {

        body += chunk;
      });

      response.on('end', function() {

        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

});


















module.exports = router;
