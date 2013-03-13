/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/12/13
 * Time: 5:52 PM
 * To change this template use File | Settings | File Templates.
 */

interface IData{

}

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
}

interface IMongoose {
    findOne(item:any, callback:ICallback) : void;
    find(id:string, callback?:ICallback) : IChainable;
    save(item: IEmptyCallback) : void;
    remove(item:any, callback:IErrorCallback) : void;
}

 interface IAxis extends IMongoose, IData{
    _id: string;
    name: string;
}

 interface IDataPoint extends IMongoose, IData{
    _id: string;
    value: string;
    axis: {
        type: string;
        ref: string;
    };
}

 interface ITrack extends IMongoose, IData{
    _id: string;
    name: string;
    axis: IAxis[];
}

 interface IUser extends IMongoose, IData{
    _id: string;
    name: string;
    tracks: ITrack[];
}

