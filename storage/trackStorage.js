var schema = require("./schema")
var storage = new schema.db();
var log = require("../utils/log");
var trackStorage = (function () {
    function trackStorage() { }
    trackStorage.prototype.pointFields = function (point) {
        return storage.extractMongoFields(point.toObject(), "dataPoints");
    };
    trackStorage.prototype.getUserForTrack = function (track, callback) {
        schema.Track.findOne({
            _id: track._id
        }).populate("user").exec(function (err, tr) {
            callback(tr);
        });
    };
    trackStorage.prototype.updateDataPoint = function (track, point, callback) {
        schema.Track.update({
            "_id": track._id,
            "dataPoints._id": point._id
        }, {
            $set: this.pointFields(point)
        }, function (err, result) {
            if(err) {
                log.debug("error updating datapoint: " + err);
            }
            callback(err);
        });
    };
    trackStorage.prototype.removeDataPoints = function (track, points, callback) {
        schema.Track.update(track._id, {
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
    return trackStorage;
})();
exports.trackStorage = trackStorage;
//@ sourceMappingURL=trackStorage.js.map
