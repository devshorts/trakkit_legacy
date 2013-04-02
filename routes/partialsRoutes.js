var requestBase = require("./requestBase")
var partialsRoutes = (function () {
    function partialsRoutes(app) {
        var _this = this;
        var requestUtils = new requestBase.requestBase();
        app.get("/partials/:view", requestUtils.ensureAuthenticated, function (req, res) {
            res.render(req.params.view, _this.dataForView(req.params.view));
        });
    }
    partialsRoutes.prototype.dataForView = function (viewName) {
        return null;
    };
    return partialsRoutes;
})();
exports.partialsRoutes = partialsRoutes;
//@ sourceMappingURL=partialsRoutes.js.map
