/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/8/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require("mongoose");

var log = require("../utils/log.js");

exports.init = function(name){
    if(name == null){
        name = "trakkit";
    }
    mongoose.connect('localhost', name);

    log.debug("database connected");
}

exports.disconnect = function () {
    mongoose.disconnect();
};

exports.schema = function(){
    var Schema = mongoose.Schema;

    var dataPoint = new Schema({
        value:String,
        order:Schema.Types.Number,
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
}();