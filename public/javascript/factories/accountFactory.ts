app.factory("AccountFactory", ["$http", "$q", "$window", "$rootScope", function($http, $q, $window, $rootScope){
  function register(user) {
      var q = $q.defer();
      $http.post('/v1/api/Register', user)
        .success(function(data){
          q.resolve(data);
        })
        .error(function(data){
          q.reject(data);
        });
        return q.promise;
    };

    // Login User /v1/api/Login
    function login (user) {
      var q = $q.defer();
      $http.post('/v1/api/Login/Local', user).success(function(data) {
        console.log(data.token);
        saveToken(data.token);
        $rootScope.currentUser = isLoggedIn();
        q.resolve("Login Successful.");
      });
      return q.promise;
    };


    $rootScope.logout = function() {
      $window.localStorage.removeItem('token');
      $rootScope.currentUser = false;
    };

    // Set Session
    function saveToken(token) {
  		$window.localStorage['token'] = token;
  	};

    function getToken() {
  		return $window.localStorage['token'];
  	};


  	function isLoggedIn() {
  		var token = getToken();
  		if(token) {
  			var payload = JSON.parse($window.atob(token.split('.')[1]));
        if (payload.exp > Date.now() / 1000) return payload;
  		}
  		else return false;
  	};
    $rootScope.currentUser = isLoggedIn();
  return {
    register : register,
    login : login,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn
  };
}]);
