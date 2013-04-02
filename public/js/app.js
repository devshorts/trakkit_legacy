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
        $routeProvider.when('/home', {
            templateUrl: '/partials/tracks',
            controller: "Controllers.IndexController"
        });
        $routeProvider.when('/track/:id', {
            templateUrl: '/partials/viewTrack',
            controller: "Controllers.TrackController"
        });
        $routeProvider.when('/logout', {
            templateUrl: '/login'
        });
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
        $locationProvider.html5Mode(true);
    }]);
//@ sourceMappingURL=app.js.map
