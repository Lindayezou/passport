app.controller("HomeController", ["$scope", "$timeout", "Socket", "$state", "$rootScope", function ($scope, $timeout, Socket, $state, $rootScope){
  if(!$rootScope.currentUser) {
      $state.go("Home");
  }
  $scope.messages = [];
  Socket.on('push-msg', function (data) {
    $scope.messages.push(data);
  });
  $scope.sendMessage = function () {
    var message = { user : $rootScope.currentUser, body: $scope.message.body}
    $scope.messages.push(message);
    Socket.emit('new-msg', message);
    $scope.message.body = "";
  };

}]);
