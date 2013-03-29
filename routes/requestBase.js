var requestBase = (function () {
    function requestBase() { }
    requestBase.prototype.ensureAuthenticated = function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/twitter');
        return null;
    };
    return requestBase;
})();
exports.requestBase = requestBase;
//@ sourceMappingURL=requestBase.js.map
