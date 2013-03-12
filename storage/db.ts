/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/12/13
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */
export class Schema{
    get(){
        var mongoose = require("mongoose");
        var Schema = mongoose.Schema;

        var dataPoint = new Schema({
            value:String,
            axis: {type:Schema.ObjectId, ref: "Axis"}
        });

        var axis = new Schema({
            name:String
        });


        var track = new Schema({
            name: String,
            axis: [axis]
        });

        var user = new Schema({
            name: String,
            tracks: [track]
        });

        return {
            "User": mongoose.model("User", user),
            "Track": mongoose.model("Track", track),
            "Axis": mongoose.model("Axis", axis),
            "DataPoint": mongoose.model("DataPoint", dataPoint)
        };
    }
}
export class storage{
    static log: any = require("../utils/log.js");
    static mongoose: any = require("mongoose");

    static schema: any = (new Schema()).get();

    static init(dbName:string, ignoreFailures:bool){
        if(dbName == null){
            dbName = "trakkit";
        }

        try{
            mongoose.connect('localhost', dbName);

            log.debug("database connected");
        }
        catch(e){
            if(!ignoreFailures){
                throw e;
            }
        }
    }

    static disconnect(){
        mongoose.disconnect();
    }

    static saveAll(docs:any, callback:() => any){
        var count = 0;
        docs.forEach(function(doc){
            doc.save(function(err){
                count++;
                if( count == docs.length ){
                    callback();
                }
            });
        });
    }
}



/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/8/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */


//
//var mongoose = require("mongoose");
//
//var log = require("../utils/log.js");
//
//exports.init = function(name, ignoreFailure){
//    if(name == null){
//        name = "trakkit";
//    }
//    try{
//        mongoose.connect('localhost', name);
//
//        log.debug("database connected");
//    }
//    catch(e){
//        if(!ignoreFailure){
//            throw e;
//        }
//    }
//}
//
//exports.disconnect = function () {
//    mongoose.disconnect();
//};
//
//exports.schema = function(){
//    var Schema = mongoose.Schema;
//
//    var dataPoint = new Schema({
//        value:String,
//        axis: {type:Schema.ObjectId, ref: "Axis"}
//    });
//
//    var axis = new Schema({
//        name:String
//    });
//
//
//    var track = new Schema({
//        name: String,
//        axis: [axis]
//    });
//
//    var user = new Schema({
//        name: String,
//        tracks: [track]
//    });
//
//    return {
//        "User": mongoose.model("User", user),
//        "Track": mongoose.model("Track", track),
//        "Axis": mongoose.model("Axis", axis),
//        "DataPoint": mongoose.model("DataPoint", dataPoint)
//    };
//}();
//
//exports.saveAll = function(docs, callback){
//        var count = 0;
//        docs.forEach(function(doc){
//            doc.save(function(err){
//                count++;
//                if( count == docs.length ){
//                    callback();
//                }
//            });
//        });
//}