/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/29/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */

import db = module("../storage/storageContainer");

var twitterStrategy = require('passport-twitter').Strategy;

export class twitterAuth{
    constructor(passport:any, app:ExpressApplication){
        passport.use(new twitterStrategy({
                consumerKey: "HNRQcQBD7V0ZL45aXS1FIQ",
                consumerSecret: "tV10jDXBPFCruEM0q8ixQDhRhNX79n4bdGRRqwloCy4",
                callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
            },
            (token, tokenSecret, profile, done) => {
                db.userStorage.getTwitterUser(profile, user => done(null, user));
            }
        ));

        // Redirect the user to Twitter for authentication.  When complete, Twitter
        // will redirect the user back to the application at
        //   /auth/twitter/callback
        app.get('/auth/twitter', passport.authenticate('twitter'));

        // Twitter will redirect the user to this URL after approval.  Finish the
        // authentication process by attempting to obtain an access token.  If
        // access was granted, the user will be logged in.  Otherwise,
        // authentication has failed.
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter',
                {
                    successRedirect: '/twitter/success',
                    failureRedirect: '/login'
                }));
    }
}
