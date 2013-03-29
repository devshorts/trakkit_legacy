
function init(app) {
    app.get("/users", function (req, res) {
        res.send(req.user.name);
    });
}
exports.init = init;
//@ sourceMappingURL=userRoutes.js.map
