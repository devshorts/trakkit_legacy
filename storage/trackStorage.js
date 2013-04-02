var schema = require("./schema")
var storage = new schema.db();
var log = require("../utils/log");
var trackStorage = (function () {
    function trackStorage() { }
    trackStorage.prototype.pointFields = function (point) {
        return storage.extractMongoFields(point.toObject(), "dataPoints");
    };
    trackStorage.prototype.addTrack = function (user, name, callback) {
        var track = storage.newTrack();
        track.user = user._id;
        track.name = name;
        track.save(callback);
    };
    trackStorage.prototype.safeRemoveTrack = function (trackId, user, callback) {
        schema.Track.remove({
            _id: trackId,
            "user": user._id
        }, callback);
    };
    trackStorage.prototype.getUserForTrack = function (track, callback) {
        schema.Track.findOne({
            _id: track._id
        }).populate("user").exec(function (err, tr) {
            callback(tr);
        });
    };
    trackStorage.prototype.updateDataPointImpl = function (track, point, callback) {
        schema.Track.update({
            "_id": track._id,
            "dataPoints._id": point._id
        }, {
            $set: this.pointFields(point)
        }, null, function (err, result) {
            if(err) {
                log.debug("error updating datapoint: " + err);
            }
            callback(err);
        });
    };
    trackStorage.prototype.removeDataPoints = function (track, points, callback) {
        schema.Track.update({
            "_id": track._id
        }, {
            $pull: {
                dataPoints: {
                    _id: {
                        $in: storage.extractIds(points)
                    }
                }
            }
        }, {
            multi: true,
            upsert: false
        }, function (err, item) {
            return callback(err);
        });
    };
    trackStorage.prototype.getTrack = function (trackId, callback) {
        schema.Track.findOne({
            _id: trackId
        }, function (err, track) {
            if(err) {
                log.debug(err);
            }
            callback(track);
        });
    };
    trackStorage.prototype.updateDataPoint = function (trackId, point, callback) {
        var _this = this;
        if(point._id == null) {
            this.getTrack(trackId, function (track) {
                track.dataPoints.push(point);
                track.save(function () {
                    return callback(track);
                });
            });
        } else {
            var track = storage.newTrack();
            track._id = storage.newObjectId(trackId);
            this.updateDataPointImpl(track, point, function (err) {
                return _this.getTrack(trackId, callback);
            });
        }
    };
    return trackStorage;
})();
exports.trackStorage = trackStorage;
//@ sourceMappingURL=trackStorage.js.map
