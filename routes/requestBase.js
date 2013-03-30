var requestBase = (function () {
    function requestBase() { }
    requestBase.prototype.ensureAuthenticated = function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
            return null;
        }
    };
    return requestBase;
})();
exports.requestBase = requestBase;
//@ sourceMappingURL=requestBase.js.map
