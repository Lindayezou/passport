app.controller("TokenController", ["AccountFactory", "token", "$rootScope", "$state", function (AccountFactory, token, $rootScope, $state) {
        AccountFactory.saveToken(token);
        $rootScope.currentUser = AccountFactory.isLoggedIn();
        $state.go("Messenger");
    }]);
