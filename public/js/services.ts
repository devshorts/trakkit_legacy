/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 4/2/13
 * Time: 10:00 AM
 * To change this template use File | Settings | File Templates.
 */


/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

declare var NG:any;
declare var angular:ng.IAngularStatic;

interface IUserService{
    currentUser(callback:(IUser) => void);
}

interface ITrackService{
    addTrack(data:any, callback:(IUser) => void);
    removeTrack(id:string, callback:(IUser) => void);
}

angular.module(NG.Services, [])
       .factory("userService", ($http:ng.IHttpService) => {
            return {
                currentUser: (callback:(IUser) => void) => {
                    $http.get("user/current").success(callback);
                }
            }
        })
        .factory("trackService", ($http:ng.IHttpService) => {
            return {

                addTrack:(data:any, callback:(IUser) => void) => {
                    $http.post('/track/add', data).success(callback);
                },
                removeTrack: (id:string, callback:(IUser) => void) => {
                    $http.delete('/track/' + id).success(callback);
                }
            }
        });