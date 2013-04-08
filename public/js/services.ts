/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 4/2/13
 * Time: 10:00 AM
 * To change this template use File | Settings | File Templates.
 */


/// <reference path="../../def/all.d.ts"/>
/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />


declare var NG:any;
declare var angular:ng.IAngularStatic;


interface IUserService{
    currentUser(callback:(user:IUser) => void);
}

interface ITrackService{
    addTrack(data:any, callback:(user:IUser) => void);
    removeTrack(id:string, callback:(user:IUser) => void);
    addDataPoint(trackId:string, dataPoint:IDataPoint, callback:(track:ITrack) => void);
    getTrack(trackId:string, callback:(track:ITrack) => void);
}

angular.module(NG.Services, [])
       .factory("userService", ($http:ng.IHttpService):IUserService => {
            return {
                currentUser: (callback:(IUser) => void) => {
                    $http.get("/api/user/current").success(callback);
                }
            }
        })
        .factory("trackService", ($http:ng.IHttpService):ITrackService => {
            return {

                getTrack:(trackId:string, callback:(ITrack) => void) => {
                    $http.get('/api/track/' + trackId).success(callback);
                },

                addTrack:(data:any, callback:(IUser) => void) => {
                    $http.post('/api/track/add', data).success(callback);
                },
                removeTrack: (id:string, callback:(IUser) => void) => {
                    $http.delete('/api/track/' + id).success(callback);
                },
                addDataPoint: (trackId:string, dataPoint:IDataPoint, callback:(ITrack) => void) => {
                    $http.post("/api/dataPoint/update", {"trackId":trackId, dp:dataPoint}).success(callback);
                }
            }
        });