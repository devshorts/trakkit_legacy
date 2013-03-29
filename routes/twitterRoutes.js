
function init(app) {
    app.get("/twitter/success", function (req, res) {
        res.send(req.user.name);
    });
}
exports.init = init;
//@ sourceMappingURL=twitterRoutes.js.map
