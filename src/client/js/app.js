var app = angular.module('MyApp', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

  // *** satellizer settings *** //
  $authProvider.github({
    //updated
    // clientId: 'ADD CLIENT ID',
    url: '/auth/github',
    clientId: 'e51cab7f2ec0d95f1ad1',
    ///updated
    // redirectUri: 'UPDATE',
    redirectUri: window.location.origin
  });
  // Google
  $authProvider.google({
    url: '/auth/google',
    clientId: '95180925901-roqr63vpsuph95a0p8u7ft1bbukag4m9.apps.googleusercontent.com',
    redirectUri: window.location.origin
  });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/welcome.html'
    })
    .when('/home', {
      templateUrl: 'partials/home.html'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupCtrl'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl',
      access: {restricted: true}
    })
    .otherwise('/');

});
