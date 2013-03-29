var schema = require("./schema")
var storage = new schema.db();
var userStorage = (function () {
    function userStorage() { }
    userStorage.prototype.getUser = function (id, callback) {
        schema.User.findOne({
            "_id": id
        }, function (err, user) {
            return callback(err, user);
        });
    };
    userStorage.prototype.getTracksForUser = function (user, callback) {
        schema.Track.find({
            "user": user._id
        }, function (err, tracks) {
            user.tracks = tracks;
            callback(user);
        });
    };
    userStorage.prototype.getTwitterUser = function (twitterProperties, insertIfNull, callback) {
        var twitterId = twitterProperties.id;
        var name = twitterProperties.displayName;
        var newUser = storage.newUser();
        newUser.name = name;
        newUser.twitterId = twitterId;
        schema.User.findOne({
            "twitterId": twitterId
        }, function (err, user) {
            if(user == null) {
                if(insertIfNull) {
                    newUser.save(function () {
                        return callback(newUser);
                    });
                } else {
                    callback(null);
                }
            } else {
                callback(user);
            }
        });
    };
    return userStorage;
})();
exports.userStorage = userStorage;
//@ sourceMappingURL=userStorage.js.map
