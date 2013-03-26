var db = require("../storage/storageContainer")
var log = require("../utils/log");
exports.group = {
    init: function (t) {
        db.storage.init("test", true);
        db.schema.User.remove({
        }, function () {
            return db.schema.DataPoint.remove({
            }, function () {
                return db.schema.Track.remove({
                }, function () {
                    return t.done();
                });
            });
        });
    },
    test: function (t) {
        var u = db.storage.newUser();
        u.name = "test";
        u.save(function () {
            db.schema.User.findOne(u._id, function (err, user) {
                console.log(user.name);
                db.schema.User.find(u._id).where("_id").equals(u._id).exec(function (err, u1) {
                    console.log(u1);
                    t.equal(u1[0].name, u.name);
                    t.done();
                });
            });
        });
    },
    manyPoints: function (t) {
        var u = db.storage.newUser();
        u.name = "manyPoints";
        u.save(function () {
            var dpList = new Array();
            for(var i = 0; i < 100; i++) {
                var dp = db.storage.newDataPoint();
                dp.xAxis = "x" + i;
                dp.yAxis = "y" + i;
                dp.user = u;
                dpList.push(dp);
            }
            db.storage.saveAll(dpList, function () {
                console.log(u._id);
                db.schema.DataPoint.find({
                    "user._id": u._id
                }, function (err, dataPoints) {
                    console.log(dataPoints);
                    t.done();
                });
            });
        });
    },
    buildTrack: function (t) {
        var u = db.storage.newUser();
        u.name = "abc";
        u.save(function () {
            u.name = "cdf";
            u.save(function () {
                return createTrack(t, u, function (_) {
                    return createTrack(t, u, function (_) {
                        return db.userStorage.getTracksForUser(u, function (foundUser) {
                            t.equal(foundUser.tracks.length, 2);
                            t.done();
                        });
                    });
                });
            });
        });
    },
    removeTrackPoints: function (test) {
        var u = db.storage.newUser();
        u.name = "updateTrackPoints";
        u.save(function () {
            createTrack(test, u, function (track) {
                var currentPoints = track.dataPoints.length;
                var filteredPoints = track.dataPoints.filter(function (elem) {
                    return elem.xAxis == "x0";
                });
                db.trackStorage.removeDataPoints(track, filteredPoints, function (err) {
                    if(err) {
                        log.debug(err);
                        test.done();
                        return;
                    }
                    db.userStorage.getTracksForUser(u, function (foundUser) {
                        var foundTrack = foundUser.tracks[0];
                        test.equal(foundTrack.dataPoints.length, currentPoints - 1);
                        test.done();
                    });
                });
            });
        });
    },
    updateTrackPoints: function (t) {
        var u = db.storage.newUser();
        u.name = "updateTrackPoints";
        u.save(function () {
            u.name = "crapper";
            u.save(function () {
                return createTrack(t, u, function (insertedTrack) {
                    return db.userStorage.getTracksForUser(u, function (foundUser) {
                        t.equal(foundUser.tracks.length, 1);
                        var point = foundUser.tracks[0].dataPoints[4];
                        var track = foundUser.tracks[0];
                        point.xAxis = "xAxis";
                        point.yAxis = "yAxis";
                        db.trackStorage.updateDataPoint(track, point, function (err) {
                            db.userStorage.getTracksForUser(u, function (user) {
                                t.equal(user.tracks[0].dataPoints[4].xAxis, point.xAxis);
                                t.equal(user.tracks[0].dataPoints[4].yAxis, point.yAxis);
                                t.done();
                            });
                        });
                    });
                });
            });
        });
    },
    end: function (t) {
        db.storage.disconnect();
        t.done();
    }
};
function createTrack(t, u, callback) {
    var track = db.storage.newTrack();
    for(var i = 0; i < 5; i++) {
        var dp = db.storage.newDataPoint();
        dp.xAxis = "x" + i;
        dp.yAxis = "y" + i;
        dp.user = u;
        track.dataPoints.push(dp);
    }
    track.user = u._id;
    track.save(function () {
        return db.trackStorage.getUserForTrack(track, callback);
    });
}
//@ sourceMappingURL=typeTests.js.map
