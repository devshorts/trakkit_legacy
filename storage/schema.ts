///<reference path='../def/all.ts'/>



export class Schema{
    public User:IUser;
    public Track:ITrack;
    public Axis:IAxis;
    public DataPoint:IDataPoint;

    constructor(){
        var mongoose = require("mongoose");
        var mongooseSchema = mongoose.Schema;

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

        this.User = mongoose.model("User", user);
        this.Track = mongoose.model("Track", track);
        this.Axis = mongoose.model("Axis", axis);
        this.DataPoint = mongoose.model("DataPoint", dataPoint);
    }
}