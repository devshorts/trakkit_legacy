var NG = {
    App: "trakkit",
    Filters: "trakkit.filters",
    Services: "trakkit.services",
    Directives: "trakkit.directives"
};
angular.module(NG.App, [
    NG.Services
]).config([
    '$routeProvider', 
    '$locationProvider', 
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/tracks',
            controller: "Controllers.IndexController"
        });
        $routeProvider.otherwise({
            redirectTo: '/login.html'
        });
        $locationProvider.html5Mode(true);
    }]);
//@ sourceMappingURL=app.js.map
