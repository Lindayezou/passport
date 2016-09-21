var app = angular.module("app", ["ui.router", "btford.socket-io"])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("Messenger", {
        url: "/messenger",
        templateUrl: "views/messaging.html",
        controller: "HomeController"
      })
      $stateProvider
        .state("Home", {
          url: "/",
          templateUrl: "views/landing.html",
          controller: "AccountController"
        })
      $stateProvider
        .state("Login", {
          url: "/account/",
          templateUrl: "views/login.html",
          controller: "AccountController"
        })
      $stateProvider
          .state("Token", {
            url: "/Token/:token",
            templateUrl: "views/token.html",
            controller: "TokenController",
            resolve: {
              token : ["$stateParams", function($stateParams) {
                return $stateParams.token;
              }]
            }
          })
      $stateProvider
          .state("Register", {
            url: "/account",
            templateUrl: "views/register.html",
            controller: "AccountController"
      })
  });
