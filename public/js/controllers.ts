/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/30/13
 * Time: 1:22 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../def/all.d.ts"/>

export interface IIndexScope extends ng.IScope{
    user:IUser;
    addTrack:Function;
    removeTrack:Function;
    form:any;
}

module Controllers{
    export class IndexController{
        constructor($scope:IIndexScope, $http:ng.IHttpService){
            $http.get("user/current").success(user => {
                $scope.user = user
            });

            $scope.addTrack = () => {
                $http.post('/track/add', $scope.form).success(user => {
                    $scope.user = user;
                })
            }

            $scope.removeTrack = id => {
                $http.delete('/track/' + id, $scope.form).success(user => {
                    $scope.user = user;
                })
            }
        }
    }
}