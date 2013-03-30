var Controllers;
(function (Controllers) {
    var IndexController = (function () {
        function IndexController($scope, $http) {
            $http.get("users/devshorts").success(function (user) {
                $scope.user = user;
            });
        }
        return IndexController;
    })();
    Controllers.IndexController = IndexController;    
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
