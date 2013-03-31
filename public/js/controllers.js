var Controllers;
(function (Controllers) {
    var IndexController = (function () {
        function IndexController($scope, $http) {
            $http.get("user/current").success(function (user) {
                $scope.user = user;
            });
        }
        return IndexController;
    })();
    Controllers.IndexController = IndexController;    
    var TrackController = (function () {
        function TrackController($scope, $http) {
            $scope.addTrack = function () {
                $http.post('/tracks/add', $scope.form).success(function (data) {
                    $location.path('/');
                });
            };
        }
        return TrackController;
    })();
    Controllers.TrackController = TrackController;    
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
