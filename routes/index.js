
/*
 * GET home page.
 */

var twitterRoutes = require("./twitterRoutes");
var userRoutes = require("./userRoutes");

module.exports = function(app){
    new twitterRoutes.twitterRoutes(app);
    new userRoutes.userRoutes(app);
};