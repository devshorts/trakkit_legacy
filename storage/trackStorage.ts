/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/24/13
 * Time: 12:10 PM
 * To change this template use File | Settings | File Templates.
 */


import schema = module("schema");

var storage = new schema.db();

var log = require("../utils/log");

export class trackStorage{

    pointFields(point:IDataPoint){
        return storage.extractMongoFields(point.toObject(), "dataPoints");
    }

    updateDataPoint(track:ITrack, point:IDataPoint, callback:(err:String) => void){
        schema.Track.update(
            {
                "_id": track._id,
                "dataPoints._id": point._id
            },
            {$set: this.pointFields(point)},
            (err, result) => {
                if(err){
                    log.debug("error updating datapoint: " + err);
                }
                callback(err)
            });
    }
}
