/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/15/13
 * Time: 12:00 PM
 * To change this template use File | Settings | File Templates.
 */


    declare module "data"{
        export class User{
            constructor(name:String);
            public name: String;
            public getName():String;
        }
    }
