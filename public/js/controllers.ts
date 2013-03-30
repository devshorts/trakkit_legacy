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
}

module Controllers{
    export class IndexController{
        constructor($scope:IIndexScope, $http:ng.IHttpService){
            $http.get("users/devshorts").success(user => {
                $scope.user = user
            });
        }
    }
}