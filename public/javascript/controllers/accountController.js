app.controller("AccountController", ["$scope", "AccountFactory", "$rootScope", "$state", "$sce", "$stateParams", function ($scope, AccountFactory, $rootScope, $state, $stateParams) {
        $scope.login = function () {
            AccountFactory.login($scope.user).then(function (data) {
                console.log(data);
                $state.go("Messenger");
            });
        };
        $scope.register = function () {
            AccountFactory.register($scope.user).then(function (data) {
                console.log(data);
                $state.go("Login");
            });
        };
    }]);
