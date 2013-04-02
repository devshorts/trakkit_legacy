angular.module(NG.Services, []).factory("userService", function ($http) {
    return {
        currentUser: function (callback) {
            $http.get("user/current").success(callback);
        }
    };
}).factory("trackService", function ($http) {
    return {
        getTrack: function (trackId, callback) {
            $http.get('/track/' + trackId).success(callback);
        },
        addTrack: function (data, callback) {
            $http.post('/track/add', data).success(callback);
        },
        removeTrack: function (id, callback) {
            var u;
            u.facebookId = "abc";
            $http.delete('/track/' + id).success(callback);
        },
        addDataPoint: function (trackId, dataPoint, callback) {
            $http.post("/dataPoint/update", {
                "trackId": trackId,
                dp: dataPoint
            }).success(callback);
        }
    };
});
//@ sourceMappingURL=services.js.map
