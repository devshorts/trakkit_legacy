var routeBase = require("./requestBase")
var indexRoutes = (function () {
    function indexRoutes(app) {
        var utils = new routeBase.requestBase();
        app.get("/", utils.ensureAuthenticated, function (req, res) {
            res.redirect("/home");
        });
        app.get("/home", utils.ensureAuthenticated, function (req, res) {
            res.render("index", {
                title: "TRAKKIT"
            });
        });
        app.get("/login", function (req, res) {
            res.render("login", {
                title: "Trakkit Login"
            });
        });
    }
    return indexRoutes;
})();
exports.indexRoutes = indexRoutes;
//@ sourceMappingURL=indexRoutes.js.map
