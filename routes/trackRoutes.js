var db = require("../storage/storageContainer")
var base = require("./requestBase")
var trackRoutes = (function () {
    function trackRoutes(app) {
        var _this = this;
        var requestUtils = new base.requestBase();
        app.get("/track/:id", requestUtils.ensureAuthenticated, function (req, res) {
            db.trackStorage.getTrack(req.params.id, function (track) {
                if(track.user.equals(req.user._id)) {
                    res.send(track.toObject());
                } else {
                    res.json(false);
                }
            });
        });
        app.post("/dataPoint/update", requestUtils.ensureAuthenticated, function (req, res) {
            var body = (req.body);
            var trackId = body.trackId;
            var dataPoint = (body.dp);
            var mappedDp = db.storage.newDataPoint();
            mappedDp.xAxis = dataPoint.xAxis;
            mappedDp.yAxis = dataPoint.yAxis;
            if(dataPoint._id != null) {
                mappedDp._id = db.storage.newObjectId(dataPoint._id);
            }
            db.trackStorage.updateDataPoint(trackId, dataPoint, function (track) {
                return res.send(track.toObject());
            });
        });
        app.post("/track/add", requestUtils.ensureAuthenticated, function (req, res) {
            var trackName = (req.body).title;
            db.trackStorage.addTrack(req.user, trackName, function () {
                return _this.queryFullUser(req, res);
            });
        });
        app.del("/track/:id", requestUtils.ensureAuthenticated, function (req, res) {
            db.trackStorage.safeRemoveTrack(req.params.id, req.user, function (err) {
                if(!err) {
                    _this.queryFullUser(req, res);
                } else {
                    res.json(false);
                }
            });
        });
    }
    trackRoutes.prototype.queryFullUser = function (req, res) {
        db.userStorage.getTracksForUser(req.user, function (user) {
            return res.send(user.toObject());
        });
    };
    return trackRoutes;
})();
exports.trackRoutes = trackRoutes;
//@ sourceMappingURL=trackRoutes.js.map
