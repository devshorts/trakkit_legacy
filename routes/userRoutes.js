var db = require("../storage/storageContainer")
var base = require("./requestBase")
var userRoutes = (function () {
    function userRoutes(app) {
        var requestUtils = new base.requestBase();
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });
        app.get("/api/users", requestUtils.ensureAuthenticated, function (req, res) {
            res.send(req.user.name);
        });
        app.get("/api/users/:id", requestUtils.ensureAuthenticated, function (req, res) {
            db.userStorage.getUser(req.params.id, function (err, foundUser) {
                return res.send(foundUser.toObject());
            });
        });
        app.get("/api/user/current", requestUtils.ensureAuthenticated, function (req, res) {
            db.userStorage.getTracksForUser(req.user, function (user) {
                return res.send(user.toObject());
            });
        });
        app.get("/api/usersUnsecure", function (req, res) {
            res.send("unsecure");
        });
        app.get("/api/user/:name/images", requestUtils.ensureAuthenticated, function (req, res) {
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
