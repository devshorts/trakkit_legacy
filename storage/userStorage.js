var schema = require("./schema")
var storage = new schema.db();
var userStorage = (function () {
    function userStorage() { }
    userStorage.prototype.getTracksForUser = function (user, callback) {
        schema.Track.find({
            "user": user._id
        }, function (err, tracks) {
            user.tracks = tracks;
            callback(user);
        });
    };
    userStorage.prototype.getTwitterUser = function (twitterId, callBack) {
    };
    return userStorage;
})();
exports.userStorage = userStorage;
//@ sourceMappingURL=userStorage.js.map
