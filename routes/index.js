
/*
 * GET home page.
 */

var userRoutes = require("./userRoutes");
var indexRoutes = require("./indexRoutes");
var trackRoutes = require("./trackRoutes");

module.exports = function(app){
    new userRoutes.userRoutes(app);
    new indexRoutes.indexRoutes(app);
    new trackRoutes.trackRoutes(app);
};
