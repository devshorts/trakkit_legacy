angular.module(NG.Services, []).factory("userService", function ($http) {
    return {
        currentUser: function (callback) {
            $http.get("user/current").success(callback);
        }
    };
}).factory("trackService", function ($http) {
    return {
        addTrack: function (data, callback) {
            $http.post('/track/add', data).success(callback);
        },
        removeTrack: function (id, callback) {
            $http.delete('/track/' + id).success(callback);
        }
    };
});
//@ sourceMappingURL=services.js.map
