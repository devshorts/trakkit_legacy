/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/28/13
 * Time: 5:41 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 * Module dependencies.
 */

import db = module("./storage/storageContainer");
import auth = module("./auth/oauthDefinitions");
import requestBase = module("./routes/requestBase");
import indexRoutes = module("./routes/indexRoutes")

var fs = require('fs');

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , log = require("./utils/log.js")
    , passport = require('passport');

var app = express();

class AppEntry{
    constructor(){
        this.initDb();
        this.setupRoutes();
        this.defineOAuth();
        this.startServer();
    }

    initDb(){
        var schema = new db.schema.db();
        schema.init(null, false);
    }

    setupRoutes(){

        var staticMiddleware = express.static(path.join(__dirname, 'public'));

        app.configure('production', () => {
            app.set('views', __dirname + '/views');
            app.set('view engine', 'jade');
            app.use(express.favicon());
            app.use(express.logger('dev'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.cookieParser('trakkittrakkit'));
            app.use(express.session());
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(express.static(path.join(__dirname, 'public')));
            app.use(app.router);
        });

        app.configure('development', () => {
            app.use(express.errorHandler());
            app.set('views', __dirname + '/views');
            app.set('view engine', 'jade');
            app.use(express.favicon());
            app.use(express.logger('dev'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.cookieParser('trakkittrakkit'));
            app.use(express.session());
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(staticMiddleware);
            app.use(app.router);
            });

        routes(app);
    }

    startServer(){
        // define catch all routes, must be last
        new indexRoutes.indexRoutes(app);

        app.listen(3000);
        console.log('Listening on port 3000');
    }

    defineOAuth(){
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            db.userStorage.getUser(id, (err, user) => done(err, user));
        })

        new auth.twitterAuth().init(passport, app);
        new auth.googleAuth().init(passport, app);
    }
}

var application = new AppEntry();