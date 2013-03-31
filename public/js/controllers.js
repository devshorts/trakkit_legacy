var Controllers;
(function (Controllers) {
    var IndexController = (function () {
        function IndexController($scope, $http) {
            var _this = this;
            $http.get("user/current").success(function (user) {
                return _this.setUser($scope, user);
            });
            $scope.addTrack = function () {
                $http.post('/track/add', $scope.form).success(function (user) {
                    return _this.setUser($scope, user);
                });
            };
            $scope.removeTrack = function (id) {
                $http.delete('/track/' + id, $scope.form).success(function (user) {
                    return _this.setUser($scope, user);
                });
            };
        }
        IndexController.prototype.setUser = function ($scope, user) {
            $scope.user = this.processUser(user);
        };
        IndexController.prototype.processUser = function (user) {
            if(user.photoUrl == null) {
                user.photoUrl = "/images/noIcon.jpg";
            }
            return user;
        };
        return IndexController;
    })();
    Controllers.IndexController = IndexController;    
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
