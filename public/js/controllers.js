var Controllers;
(function (Controllers) {
    var IndexController = (function () {
        function IndexController($scope, $http) {
            $http.get("user/current").success(function (user) {
                $scope.user = user;
            });
            $scope.addTrack = function () {
                $http.post('/track/add', $scope.form).success(function (user) {
                    $scope.user = user;
                });
            };
            $scope.removeTrack = function (id) {
                $http.delete('/track/' + id, $scope.form).success(function (user) {
                    $scope.user = user;
                });
            };
        }
        return IndexController;
    })();
    Controllers.IndexController = IndexController;    
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
