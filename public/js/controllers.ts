/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/30/13
 * Time: 1:22 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../def/all.d.ts"/>
/// <reference path="services.ts" />

export interface IIndexScope extends ng.IScope{
    user:IUser;
    addTrack:Function;
    removeTrack:Function;
    form:any;
}

export interface ITrackScope extends ng.IScope{
    track:ITrack;
    addPoint:Function;
    form:any;
}

export interface ITrackRouteParams{
    id:string;
}

module Controllers{
    export class IndexController {
        constructor($scope:IIndexScope, $http:ng.IHttpService, userService:IUserService, trackService:ITrackService) {
            var updateScope = (user:IUser) => this.setUser($scope, user);

            userService.currentUser(updateScope);

            $scope.addTrack = () => {
                trackService.addTrack($scope.form, updateScope)
            };

            $scope.removeTrack = id => {
                trackService.removeTrack(id, updateScope)
            }
        }

        setUser($scope:IIndexScope, user:IUser) {
            $scope.user = this.processUser(user);
        }

        processUser(user:IUser):IUser {
            if (user.photoUrl == null) {
                user.photoUrl = "/images/noIcon.jpg";
            }
            return user;
        }
    }

    export class TrackController {
        constructor($scope:ITrackScope, $http:ng.IHttpService, userService:IUserService, trackService:ITrackService, $routeParams:ITrackRouteParams) {
            var updateScope = (track:ITrack) => $scope.track = track;

            trackService.getTrack($routeParams.id, updateScope);

            $scope.addPoint = () => {
                var dp:IDataPoint = <IDataPoint>{
                    xAxis: $scope.form.xAxis,
                    yAxis: $scope.form.yAxis
                };
                trackService.addDataPoint($scope.track._id.toString(), dp, updateScope)
            }
        }
    }
}