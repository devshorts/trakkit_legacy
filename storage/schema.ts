///<reference path='../def/all.ts'/>


export class Schema{
    public User:IUser;
    public Track:ITrack;
    public Axis:IAxis;
    public DataPoint:IDataPoint;

    constructor(){
        var mongoose:IMongooseBase = require("mongoose");
        var mongooseSchema = <MongooseSchema>mongoose.Schema;

        var dataPoint = new mongooseSchema({
            value:String,
            axis: {type:mongooseSchema.ObjectId, ref: "Axis"}
        });

        var axis = new mongooseSchema({
            name:String
        });

        var track = new mongooseSchema({
            name: String,
            axis: [axis]
        });

        var user = new mongooseSchema({
            name: String,
            tracks: [track]
        });

        this.User = <User>mongoose.model("User", user);
        this.Track = <Track>mongoose.model("Track", track);
        this.Axis = <Axis>mongoose.model("Axis", axis);
        this.DataPoint = <DataPoint>mongoose.model("DataPoint", dataPoint);
    }
}

export declare class Axis implements IAxis{
    constructor(item:any);
}
export declare class Track implements ITrack{
    constructor(item:any);
}
export declare class User implements IUser{
    constructor(item:any);
}
export declare class DataPoint implements IDataPoint{
    constructor(item:any);
}
