/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 4/2/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */


/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

declare var angular:ng.IAngularStatic;

var NG = {
    App: "trakkit",
    Filters: "trakkit.filters",
    Services: "trakkit.services",
    Directives: "trakkit.directives"
};

// Declare app level module which depends on filters, and services
angular.module(NG.App, [NG.Services]).
    config(['$routeProvider',
            '$locationProvider',
            ($routeProvider:ng.IRouteProvider, $locationProvider:ng.ILocationProvider) => {
                $routeProvider.when('/home', {templateUrl: '/partials/tracks', controller: "Controllers.IndexController"});
                $routeProvider.when('/track/:id', {templateUrl: '/partials/viewTrack', controller: "Controllers.TrackController"});
                $routeProvider.when('/logout', {templateUrl: '/login'});
                $routeProvider.otherwise({redirectTo: '/login'});
                $locationProvider.html5Mode(true);
            }]);