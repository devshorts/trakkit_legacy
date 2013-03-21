///<reference path='../def/all.ts'/>
///<reference path='../def/lib.d.ts'/>

var mongoose:any = require("mongoose");

// Need to provide the same structure in 'mongoose' style format to define.
var userSchema = new mongoose.Schema(
    {
        name: String
    });

var dataPointSchema = new mongoose.Schema({
    xAxis: String,
    yAxis: String
});

var trackSchema = new mongoose.Schema({
    dataPoints: [dataPointSchema],
    name: String,
    user: {type: mongoose.Schema.ObjectId, ref:"User"}
})

export var User:IMongooseSearchable = <IMongooseSearchable><{ new() : IUser; }>mongoose.model('User', userSchema);
export var DataPoint:IMongooseSearchable = <IMongooseSearchable><{ new() : IDataPoint; }>mongoose.model('DataPoint', dataPointSchema);
export var Track:IMongooseSearchable = <IMongooseSearchable><{ new() : ITrack; }>mongoose.model('Track', trackSchema);

export class db{


    init(dbName:string, ignoreFailures:bool){
        if(dbName == null){
            dbName = "trakkit";
        }

        try{
            mongoose.connect('localhost', dbName);
        }
        catch(e){
            if(!ignoreFailures){
                throw e;
            }
        }
    }

    disconnect(){
        mongoose.disconnect();
    }

    newUser():IUser{
        return <IUser>new User();
    }

    newDataPoint():IDataPoint{
        return <IDataPoint>new DataPoint();
    }

    newTrack():ITrack{
        return <ITrack>new Track();
    }

    newObjectId(id:String):any{
        return mongoose.Schema.ObjectId(id);
    }

    pruneObject(data:IMongooseBase):Object{
        var obj = data.toObject();
        if(obj.hasOwnProperty("_id")){
            delete obj._id;
        }

        return obj;
    }

    saveAll(docs:IMongooseBase[], callback:() => any){
        var count = 0;
        docs.forEach( (doc,_,_)=> {
            doc.save(() => {
                count++;
                if( count == docs.length ){
                    callback();
                }
            });
        });
    }
}

