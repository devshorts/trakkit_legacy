var routeBase = require("./requestBase")
var indexRoutes = (function () {
    function indexRoutes(app) {
        var _this = this;
        var utils = new routeBase.requestBase();
        app.get("/", utils.ensureAuthenticated, function (req, res) {
            res.redirect("/home");
        });
        app.get("/home", utils.ensureAuthenticated, function (req, res) {
            _this.renderIndex(res);
        });
        app.get("/login", function (req, res) {
            res.render("login", {
                title: "Trakkit Login"
            });
        });
        app.get("*", function (req, res) {
            _this.renderIndex(res);
        });
    }
    indexRoutes.prototype.renderIndex = function (res) {
        res.render("index", {
            title: "TRAKKIT"
        });
    };
    return indexRoutes;
})();
exports.indexRoutes = indexRoutes;
//@ sourceMappingURL=indexRoutes.js.map
