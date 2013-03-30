var db = require("../storage/storageContainer")
var twitterStrategy = require('passport-twitter').Strategy;
var googleStrategy = require('passport-google').Strategy;
var log = require("../utils/log");
var localHost = "http://127.0.0.1:3000/";
function mergeHosts(callback) {
    return localHost + callback;
}
var twitterAuth = (function () {
    function twitterAuth() { }
    twitterAuth.prototype.init = function (passport, app) {
        passport.use(new twitterStrategy({
            consumerKey: "HNRQcQBD7V0ZL45aXS1FIQ",
            consumerSecret: "tV10jDXBPFCruEM0q8ixQDhRhNX79n4bdGRRqwloCy4",
            callbackURL: mergeHosts("auth/twitter/callback")
        }, function (token, tokenSecret, profile, done) {
            db.userStorage.getTwitterUser(profile, function (user) {
                return done(null, user);
            });
        }));
        app.get('/auth/twitter', passport.authenticate('twitter'));
        app.get('/auth/twitter/callback', passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login.html'
        }));
    };
    return twitterAuth;
})();
exports.twitterAuth = twitterAuth;
var googleAuth = (function () {
    function googleAuth() { }
    googleAuth.prototype.init = function (passport, app) {
        var _this = this;
        passport.use(new googleStrategy({
            returnURL: 'http://localhost:3000/auth/google/return',
            realm: 'http://localhost:3000/'
        }, function (identifier, profile, done) {
            profile.id = _this.extractId(identifier);
            db.userStorage.getGoogleUser(profile, function (user) {
                return done(null, user);
            });
        }));
        app.get('/auth/google', passport.authenticate('google'));
        app.get('/auth/google/return', passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login.html'
        }));
    };
    googleAuth.prototype.extractId = function (id) {
        try  {
            return id.replace("https://www.google.com/accounts/o8/id?id=", "");
        } catch (e) {
            log.debug("Error extracting id: " + e);
            return null;
        }
    };
    return googleAuth;
})();
exports.googleAuth = googleAuth;
//@ sourceMappingURL=oauthDefinitions.js.map
