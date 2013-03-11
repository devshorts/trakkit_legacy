
    /**
     * Module dependencies.
     */

    var express = require('express')
      , routes = require('./routes')
      , user = require('./routes/user')
      , http = require('http')
      , path = require('path')
      , db = require('./storage/db.js')
        , log = require("./utils/log.js");


    var app = express();

    db.init();

    app.configure(function(){
      app.set('port', process.env.PORT || 3000);
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.cookieParser('trakkittrakkit'));
      app.use(express.session());
      app.use(app.router);
      app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function(){
      app.use(express.errorHandler());
    });

    app.get('/', routes.index);
    app.get('/users', user.list);

    http.createServer(app).listen(app.get('port'), function(){
        log.debug("Express server listening on port " + app.get('port'));
    });
