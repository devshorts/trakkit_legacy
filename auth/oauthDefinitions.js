var db = require("../storage/storageContainer")
var twitterStrategy = require('passport-twitter').Strategy;
var twitterAuth = (function () {
    function twitterAuth(passport, app) {
        passport.use(new twitterStrategy({
            consumerKey: "HNRQcQBD7V0ZL45aXS1FIQ",
            consumerSecret: "tV10jDXBPFCruEM0q8ixQDhRhNX79n4bdGRRqwloCy4",
            callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
        }, function (token, tokenSecret, profile, done) {
            db.userStorage.getTwitterUser(profile, function (user) {
                return done(null, user);
            });
        }));
        app.get('/auth/twitter', passport.authenticate('twitter'));
        app.get('/auth/twitter/callback', passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    }
    return twitterAuth;
})();
exports.twitterAuth = twitterAuth;
//@ sourceMappingURL=oauthDefinitions.js.map
