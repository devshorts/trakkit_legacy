
/*
 * GET home page.
 */

module.exports = function(app){
    require("./twitterRoutes").init(app);
    require("./userRoutes").init(app);
};