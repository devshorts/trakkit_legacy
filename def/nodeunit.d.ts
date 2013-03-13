/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/13/13
 * Time: 4:16 PM
 * To change this template use File | Settings | File Templates.
 */

interface ITest{
    done(): void;
    equal(expected:any, actual:any, message?:string);
}