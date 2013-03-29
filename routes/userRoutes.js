
var base = require("./requestBase")
var userRoutes = (function () {
    function userRoutes(app) {
        var requestUtils = new base.requestBase();
        app.get("/users", requestUtils.ensureAuthenticated, function (req, res) {
            res.send(req.user.name);
        });
        app.get("/usersUnsecure", function (req, res) {
            res.send("unsecure");
        });
    }
    return userRoutes;
})();
exports.userRoutes = userRoutes;
//@ sourceMappingURL=userRoutes.js.map
