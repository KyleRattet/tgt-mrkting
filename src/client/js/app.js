var app = angular.module('MyApp', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

  // *** satellizer settings *** //
  //GitHub
  $authProvider.github({
    url: '/auth/github',
    clientId: 'e51cab7f2ec0d95f1ad1',
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
      templateUrl: '/partials/welcome.html'
    })
    .when('/research', {
      templateUrl: 'partials/research.html',
      controller: 'queryCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html'
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
