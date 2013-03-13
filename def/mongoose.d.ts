/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/13/13
 * Time: 4:17 PM
 * To change this template use File | Settings | File Templates.
 */

interface ICallback{
    callback(error:string, item:any): void;
}

interface IEmptyCallback{
    callback() : void;
}

interface IErrorCallback{
    callback(item:string) : void;
}

interface IChainable{
    exec(item:ICallback) : IChainable;
    populate(...args: any[]) : IChainable;
}

interface IMongoose {
    findOne(item:any, callback:ICallback) : void;
    find(id:string, callback?:ICallback) : IChainable;
    save(item: IEmptyCallback) : void;
    remove(item:any, callback:IErrorCallback) : void;
    push(item:IMongoose):void;
}

interface IMongooseSchema{
    ObjectId:String;
}

declare class MongooseSchema implements IMongooseSchema{
    constructor(item:any);
    public ObjectId:String;
}
interface IMongooseBase{
    model(name:String, ref:any):any;
    Schema():any;
}