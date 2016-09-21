app.controller("AccountController", ["$scope", "AccountFactory", "$rootScope", "$state", "$sce", "$stateParams", function($scope, AccountFactory, $rootScope, $state, $stateParams){
  // if(token) {
  //   AccountFactory.saveToken(token);
  //   console.log(token);
  // }
  $scope.login = function() {
    AccountFactory.login($scope.user).then(function(data){
      console.log(data);
      $state.go("Messenger");
    });
  };
  $scope.register = function() {
    AccountFactory.register($scope.user).then(function(data){
      console.log(data);
      $state.go("Login");
    });
  };

}]);
