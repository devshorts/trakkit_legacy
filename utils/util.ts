/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/29/13
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */

export class collection{
    static isNullOrEmpty(arr:any[]){
        if(arr == null || arr.length == 0){
            return true;
        }
        return false;
    }
}