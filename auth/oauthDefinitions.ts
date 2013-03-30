/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/29/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../def/all.d.ts" />

import db = module("../storage/storageContainer");

var twitterStrategy = require('passport-twitter').Strategy;
var googleStrategy = require('passport-google').Strategy;
var log = require("../utils/log");

export interface IAuthorizer{
    init(passport:any, app:ExpressApplication);
}

var localHost:string = "http://127.0.0.1:3000/"

function mergeHosts(callback:string):String{
    return localHost + callback;
}

export class twitterAuth implements IAuthorizer{

    init(passport:any, app:ExpressApplication){
        passport.use(new twitterStrategy({
                consumerKey: "HNRQcQBD7V0ZL45aXS1FIQ",
                consumerSecret: "tV10jDXBPFCruEM0q8ixQDhRhNX79n4bdGRRqwloCy4",
                callbackURL: mergeHosts("auth/twitter/callback")
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
                    successRedirect: '/',
                    failureRedirect: '/login'
                }));
    }
}

// **************************
// ************* GOOGLE *****
// **************************

export class googleAuth implements IAuthorizer{

    init(passport:any, app:ExpressApplication){
        passport.use(new googleStrategy({
                returnURL: 'http://localhost:3000/auth/google/return',
                realm: 'http://localhost:3000/'
            },
            (identifier, profile, done) => {
                profile.id = this.extractId(identifier);
                db.userStorage.getGoogleUser(profile, user => done(null, user));
            }
        ));

        // Redirect the user to Google for authentication.  When complete, Google
        // will redirect the user back to the application at
        //     /auth/google/return
        app.get('/auth/google', passport.authenticate('google'));

        // Google will redirect the user to this URL after authentication.  Finish
        // the process by verifying the assertion.  If valid, the user will be
        // logged in.  Otherwise, authentication has failed.
        app.get('/auth/google/return',
            passport.authenticate('google', { successRedirect: '/',
                failureRedirect: '/login' }));
    }

    extractId(id:string){
        try{
            return id.replace("https://www.google.com/accounts/o8/id?id=","");
        }
        catch(e){
            log.debug("Error extracting id: " + e);
            return null;
        }
    }
}