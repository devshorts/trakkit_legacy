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
    callback:(error:any, item:IData) => void;
}

interface IChainable{
    //exec:
}

interface IMongoose{
    findOne: (item:any, callback:ICallback) => void;
    find: (id:string, callback:ICallback) => IChainable;
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

