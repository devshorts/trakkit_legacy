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
    callback(item?:string) : void;
}

interface IWhere{
    equals(value:String):IChainable;
    gt(value:String):IChainable;
    lt(value:String):IChainable;
    in(value:String[]):IChainable;
}

interface IChainable{
    exec(item:ICallback) : IChainable;
    populate(...args: any[]) : IChainable;
    select(query:string):IChainable;
    limit(num:Number):IChainable;
    sort(field:String):IChainable;
    where(selector:String):IWhere;
}

interface IUpdateOptions{
    safe?:Boolean;
    upsert?:Boolean;
    multi?:Boolean;
    strict?:Boolean;
}
interface IMongooseSearchable{
    findOne(item:any, callback?:ICallback) : IChainable;
    find(id:string, fields?:any, options?:any, callback?:ICallback) : IChainable;
    find(propBag:Object, callback?:ICallback) : IChainable;
    remove(item:any, callback:IErrorCallback) : void;
    update(query:Object, updatedFields:Object, options?:IUpdateOptions, callback?:(error:String, numResponses:Number, rawResponse:any) => void);
}

interface IMongooseBase {
    save(item: IEmptyCallback) : void;
    push(item:IMongooseBase):void;
    toObject():Object;
}