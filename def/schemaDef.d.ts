/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/12/13
 * Time: 5:52 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="./mongoose.d.ts"/>

interface IAxis extends IMongooseBase{
    _id: string;
    name: string;
}

interface IDataPoint extends IMongooseBase{
    _id: string;
    xAxis: string;
    yAxis: string;
    user: IUser;
}

interface ITrack extends IMongooseBase{
    _id: string;
    name: string;
    axis: IAxis[];
}

interface IUser extends IMongooseBase{
    _id: string;
    name: string;
    tracks: ITrack[];
}

