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
})(Controllers || (Controllers = {}));
//@ sourceMappingURL=controllers.js.map
