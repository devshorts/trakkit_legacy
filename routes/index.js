
/*
 * GET home page.
 */

var userRoutes = require("./userRoutes");
var indexRoutes = require("./indexRoutes");

module.exports = function(app){
    new userRoutes.userRoutes(app);
    new indexRoutes.indexRoutes(app);
};
