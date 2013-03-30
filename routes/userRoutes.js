var db = require("../storage/storageContainer")
var base = require("./requestBase")
var userRoutes = (function () {
    function userRoutes(app) {
        var requestUtils = new base.requestBase();
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });
        app.get("/users", requestUtils.ensureAuthenticated, function (req, res) {
            res.send(req.user.name);
        });
        app.get("/users/:name", requestUtils.ensureAuthenticated, function (req, res) {
            db.userStorage.getUserByUsername(req.params.name, function (err, foundUser) {
                return res.send(foundUser.toObject());
            });
        });
        app.get("/user/current", requestUtils.ensureAuthenticated, function (req, res) {
            res.send(req.user);
        });
        app.get("/usersUnsecure", function (req, res) {
            res.send("unsecure");
        });
        app.get("/user/:name/images", requestUtils.ensureAuthenticated, function (req, res) {
            db.userStorage.getUserByUsername(req.params.name, function (err, foundUser) {
                res.render("user.jade", {
                    user: foundUser.toObject()
                });
            });
        });
    }
    return userRoutes;
})();
exports.userRoutes = userRoutes;
//@ sourceMappingURL=userRoutes.js.map
