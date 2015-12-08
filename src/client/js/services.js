app.factory('httpFactory', ['$http', function($http) {
  var obj = {};

  obj.get = function(url, payload) {
    return $http.get(url, payload);
  };

  obj.post = function (url, payload) {
    return $http.post(url, payload);
  };

  obj.delete = function(url) {
    return $http.delete(url);
  };

  obj.put = function(url) {
    return $http.delete(url);
  };

  obj.getData = function(id){
    return $http.get("http://www.bea.gov/api/data/?&UserID="+id+"&method=GetData&datasetname=RegionalData&KeyCode=PCDPI_SI&GeoFIPS=STATE&Year=2012&ResultFormat=JSON&");
  };

  obj.getData = function(url,payload,variable){
    return $http.get(url, payload);
  };

  return obj;
}]);
