var db = require("../storage/storageContainer")
var base = require("./requestBase")
var trackRoutes = (function () {
    function trackRoutes(app) {
        var _this = this;
        var requestUtils = new base.requestBase();
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
