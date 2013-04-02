var Controllers;
(function (Controllers) {
    var IndexController = (function () {
        function IndexController($scope, $http, userService, trackService) {
            var _this = this;
            var updateScope = function (user) {
                return _this.setUser($scope, user);
            };
            userService.currentUser(updateScope);
            $scope.addTrack = function () {
                trackService.addTrack($scope.form, updateScope);
            };
            $scope.removeTrack = function (id) {
                trackService.removeTrack(id, updateScope);
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
    var TrackController = (function () {
        function TrackController($scope, $http, userService, trackService, $routeParams) {
            var updateScope = function (track) {
                return $scope.track = track;
            };
            trackService.getTrack($routeParams.id, updateScope);
            $scope.addPoint = function () {
                var dp = {
                    xAxis: $scope.form.xAxis,
                    yAxis: $scope.form.yAxis
                };
                trackService.addDataPoint($scope.track._id.toString(), dp, updateScope);
            };
        }
        return TrackController;
    })();
    Controllers.TrackController = TrackController;    
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
