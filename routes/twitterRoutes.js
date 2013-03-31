var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var routeBase = require("./requestBase")
var twitterRoutes = (function (_super) {
    __extends(twitterRoutes, _super);
    function twitterRoutes(app) {
        _super.call(this);
        app.get("/twitter/success", function (req, res) {
            res.send(req.user.name);
        });
    }
    return twitterRoutes;
})(routeBase.requestBase);
exports.twitterRoutes = twitterRoutes;
//@ sourceMappingURL=twitterRoutes.js.map
