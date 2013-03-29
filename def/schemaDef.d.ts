/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/12/13
 * Time: 5:52 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="./mongoose.d.ts"/>

interface IDataPoint extends IMongooseBase{
    xAxis: string;
    yAxis: string;
}

interface ITrack extends IMongooseBase{
    name: string;
    dataPoints: IDataPoint[];
    user:any;
}

interface IUser extends IMongooseBase{
    name: string;
    photoUrl:String;
    facebookId:String;
    googleId:String;
    email:String;
    twitterId: string;
    tracks: ITrack[];
}

