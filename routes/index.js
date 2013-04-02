
/*
 * GET home page.
 */

var userRoutes = require("./userRoutes");
var indexRoutes = require("./indexRoutes");
var trackRoutes = require("./trackRoutes");
var partialsRoutes = require("./partialsRoutes");

module.exports = function(app){
    new userRoutes.userRoutes(app);
    new indexRoutes.indexRoutes(app);
    new trackRoutes.trackRoutes(app);
    new partialsRoutes.partialsRoutes(app);
};

