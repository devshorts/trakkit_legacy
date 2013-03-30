var db = require("./storage/storageContainer")
var auth = require("./auth/oauthDefinitions")
var requestBase = require("./routes/requestBase")
var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), log = require("./utils/log.js"), passport = require('passport');
var app = express();
var AppEntry = (function () {
    function AppEntry() {
        this.initDb();
        this.setupRoutes();
        this.defineOAuth();
        this.startServer();
    }
    AppEntry.prototype.initDb = function () {
        var schema = new db.schema.db();
        schema.init(null, false);
    };
    AppEntry.prototype.setupRoutes = function () {
        var staticMiddleware = express.static(path.join(__dirname, 'public'));
        app.configure('production', function () {
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
            app.use(app.router);
            app.use(express.static(path.join(__dirname, 'public')));
        });
        app.configure('development', function () {
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
            app.use(app.router);
            app.use(staticMiddleware);
        });
        routes(app);
    };
    AppEntry.prototype.startServer = function () {
        app.listen(3000);
        console.log('Listening on port 3000');
    };
    AppEntry.prototype.defineOAuth = function () {
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function (id, done) {
            db.userStorage.getUser(id, function (err, user) {
                return done(err, user);
            });
        });
        var twitterSetup = new auth.twitterAuth(passport, app);
        var requestUtils = new requestBase.requestBase();
        app.all('*', requestUtils.ensureAuthenticated);
    };
    return AppEntry;
})();
var application = new AppEntry();
//@ sourceMappingURL=app.js.map
