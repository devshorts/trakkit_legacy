angular.module(NG.Services, []).factory("userService", function ($http) {
    return {
        currentUser: function (callback) {
            $http.get("/api/user/current").success(callback);
        }
    };
}).factory("trackService", function ($http) {
    return {
        getTrack: function (trackId, callback) {
            $http.get('/api/track/' + trackId).success(callback);
        },
        addTrack: function (data, callback) {
            $http.post('/api/track/add', data).success(callback);
        },
        removeTrack: function (id, callback) {
            $http.delete('/api/track/' + id).success(callback);
        },
        addDataPoint: function (trackId, dataPoint, callback) {
            $http.post("/api/dataPoint/update", {
                "trackId": trackId,
                dp: dataPoint
            }).success(callback);
        }
    };
});
//@ sourceMappingURL=services.js.map
