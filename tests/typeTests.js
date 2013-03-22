var db = require("../storage/storageContainer")
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
                var id = db.storage.newObjectId(u._id);
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
        u.name = "buildTrackUser";
        u.save(function () {
            u.name = "crapper";
            u.save(function () {
                return createTrack(t, u, function () {
                    return createTrack(t, u, function () {
                        return db.userStorage.getTracksForUser(u, function (foundUser) {
                            t.equal(foundUser.tracks.length, 2);
                            t.done();
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
    for(var i = 0; i < 100; i++) {
        var dp = db.storage.newDataPoint();
        dp.xAxis = "x" + i;
        dp.yAxis = "y" + i;
        dp.user = u;
        track.dataPoints.push(dp);
    }
    track.user = u._id;
    track.save(function () {
        db.schema.Track.findOne(track._id).populate("user").exec(function (err, tr) {
            t.equal(u.name, tr.user.name);
            t.equal(tr.dataPoints.length, 100);
            callback();
        });
    });
}
//@ sourceMappingURL=typeTests.js.map
