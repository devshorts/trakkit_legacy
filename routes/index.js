
/*
 * GET home page.
 */

var twitterRoutes = require("./twitterRoutes");
var userRoutes = require("./userRoutes");
var indexRoutes = require("./indexRoutes");

module.exports = function(app){
    new twitterRoutes.twitterRoutes(app);
    new userRoutes.userRoutes(app);
    new indexRoutes.indexRoutes(app);
};
