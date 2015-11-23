app.factory('httpFactory', ['$http', function($http) {
  var obj = {};

  //1.get request
  obj.get = function(url, payload) {
    return $http.get(url, payload);
  };

  //2. post request
  obj.post = function (url, payload) {
    return $http.post(url, payload);
  };

  //3. delete request

  obj.delete = function(url) {
    return $http.delete(url);
  };

  //4. Put request
  obj.put = function(url) {
    return $http.delete(url);
  };

  obj.getData = function(id){
    return $http.get("http://www.bea.gov/api/data/?&UserID="+id+"&method=GetData&datasetname=RegionalData&KeyCode=PCDPI_SI&GeoFIPS=STATE&Year=2012&ResultFormat=JSON&");
  };

  return obj;
}]);
