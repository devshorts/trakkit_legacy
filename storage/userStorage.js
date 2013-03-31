var schema = require("./schema")
var util = require("../utils/util")
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
    userStorage.prototype.getUserByUsername = function (userName, callback) {
        schema.User.findOne({
            "name": userName
        }, function (err, user) {
            return callback(err, user);
        });
    };
    userStorage.prototype.getTracksForUser = function (user, callback) {
        schema.Track.find({
            "user": user._id
        }, function (err, tracks) {
            user.tracks = tracks;
            ((user._doc)).tracks = tracks;
            callback(user);
        });
    };
    userStorage.prototype.getTwitterUser = function (properties, callback) {
        this.findOrOAuthAddUser(properties, "twitterId", callback);
    };
    userStorage.prototype.getFacebookUser = function (properties, callback) {
        this.findOrOAuthAddUser(properties, "facebookId", callback);
    };
    userStorage.prototype.getGoogleUser = function (properties, callback) {
        this.findOrOAuthAddUser(properties, "googleId", callback);
    };
    userStorage.prototype.findOrOAuthAddUser = function (properties, findId, callback) {
        var _this = this;
        var searchable = {
        };
        searchable[findId] = properties.id;
        schema.User.findOne(searchable, function (err, user) {
            if(user != null) {
                callback(user);
            } else {
                _this.createOAuthUser(properties, findId, callback);
            }
        });
    };
    userStorage.prototype.createOAuthUser = function (properties, findId, callback) {
        var name = properties.displayName;
        var newUser = storage.newUser();
        if(!util.collection.isNullOrEmpty(properties.emails)) {
            newUser.email = properties.emails[0].value;
        }
        if(!util.collection.isNullOrEmpty(properties.photos)) {
            newUser.photoUrl = properties.photos[0].value;
        }
        newUser.name = name;
        newUser[findId] = properties.id;
        newUser.save(function () {
            return callback(newUser);
        });
    };
    return userStorage;
})();
exports.userStorage = userStorage;
//@ sourceMappingURL=userStorage.js.map
