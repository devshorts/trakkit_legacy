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

module Controllers{
    export class IndexController{
        constructor($scope:IIndexScope, $http:ng.IHttpService, userService:IUserService, trackService:ITrackService){
            var updateScope = (user:IUser) => this.setUser($scope, user);

            userService.currentUser(updateScope);

            $scope.addTrack = () => {
                trackService.addTrack($scope.form, updateScope)
            }

            $scope.removeTrack = id => {
                trackService.removeTrack(id, updateScope)
            }
        }

        setUser($scope:IIndexScope, user:IUser){
            $scope.user = this.processUser(user);
        }

        processUser(user:IUser):IUser{
            if(user.photoUrl == null){
                user.photoUrl = "/images/noIcon.jpg";
            }
            return user;
        }
    }
}