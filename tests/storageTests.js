var db = require("../storage/db")
var storage = db.storage;
var data = db.storage.schema;
var TestHelpers = (function () {
    function TestHelpers() { }
    TestHelpers.prototype.addTrackForUser = function (user, callback) {
        var axis = new data.Axis({
            name: "axis"
        });
        var track = new data.Track({
            name: "trackName"
        });
        var track2 = new data.Track({
            name: "trackName2"
        });
        track.axis = [
            axis, 
            axis
        ];
        user.tracks = [
            track, 
            track2
        ];
        var dataPoints = [];
        for(var i = 0; i < 100; i++) {
            var dataPoint = new data.DataPoint({
                value: i.toString(),
                axis: axis
            });
            dataPoints.push(dataPoint);
        }
        user.save(function () {
            return storage.findUser(user.name, function (err, updatedUser) {
                storage.saveAll(dataPoints, function () {
                    return callback(updatedUser);
                });
            });
        });
    };
    TestHelpers.prototype.addUser = function (username, callback) {
        var _this = this;
        var name = username;
        var user = new data.User();
        user.name = name;
        user.save(function () {
            return storage.findUser(name, function (err, u) {
                return _this.addTrackForUser(u, callback);
            });
        });
    };
    return TestHelpers;
})();
var Tests = (function () {
    function Tests() { }
    Tests.prototype.setUp = function (callback) {
        storage.init("test", true);
        data.User.remove({
        }, function (err) {
            data.DataPoint.remove({
            }, function (err) {
                callback();
            });
        });
    };
    Tests.prototype.basicUserWIthDataPoints = function (test) {
        var testHelper = new TestHelpers();
        testHelper.addUser("test2", function (user) {
            var axis = user.tracks[0].axis[0];
            data.DataPoint.find(axis._id).exec(function (err, dp) {
                test.equal(dp.length, 100, "Did not find data points");
                test.done();
            });
        });
    };
    Tests.prototype.deleteEndPoint = function (test) {
        var testHelper = new TestHelpers();
        testHelper.addUser("test2", function (user) {
            var axis = user.tracks[0].axis[0];
            data.DataPoint.find(axis._id).exec(function (err, dataPoints) {
                test.equal(dataPoints.length, 100, "Didn't pull back enough data points");
                dataPoints[0].remove(function (dp) {
                    data.DataPoint.find(axis._id).exec(function (err, points) {
                        test.equal(points.length, 99, "Did not delete data point");
                        test.done();
                    });
                });
            });
        });
    };
    Tests.prototype.end = function (test) {
        storage.disconnect();
        test.done();
    };
    return Tests;
})();
var tests = new Tests();
exports.group = {
    setUp: tests.setUp,
    basicUserWithDataPoints: tests.basicUserWIthDataPoints,
    deleteEndPoint: tests.deleteEndPoint,
    end: tests.end
};
//@ sourceMappingURL=storageTests.js.map
