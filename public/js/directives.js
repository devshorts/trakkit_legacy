angular.module(NG.Directives, []).directive('appVersion', [
    'version', 
    function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);
//@ sourceMappingURL=directives.js.map
