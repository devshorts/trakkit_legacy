/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/8/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require("../storage/db.js");

db.init("test");

var addUser = function(username, callback){
    var name = username;


    var user = new db.schema.User();

    var addTrack = function(u){
        var axis = new db.schema.Axis({name:"axis"});
        var track = new db.schema.Track({name: "trackName"});
        var track2 = new db.schema.Track({name: "trackName2"});
        track.axis = [axis, axis];
        u.tracks = [track, track2];

        for(var i=0;i<100;i++){
            var dataPoint = new db.schema.DataPoint({
                value: i.toString()
            });
            axis.dataPoints.push(dataPoint);
        }

        u.save(function(){
            db.schema.User.findOne({name: name}, function(err, u1){
                console.log(u1.tracks[0].axis[0]);
                callback(u1);
            });
        })
    };

    user.name = name;

    user.save(function(){
        db.schema.User.findOne({name: name}, (function(err, u){
            console.log(u);
            addTrack(u);
        }));
    });
}

module.exports.group = {
    setUp: function(callback){
        db.schema.User.remove({}, function(err) {
            console.log('users removed');
            callback();
        });
    },

    tearDown: function (callback) {
        db.disconnect();
        callback();
    },
//
//    'sync db' : function(test){
//        addUser("test1", function(user){
//
//            console.log("starting test");
//            console.log(user);
//
//            db.schema.User.findOne({"tracks.name": "trackName"}, {"tracks.$": 1})
//                .populate("track.axis.dataPoints")
//                .exec(function(err, thing){
//                    console.log(thing);
//                    test.done();
//                });
//        });
//    },

    'find user': function(test){
        addUser("test2", function(user){

            console.log("starting test2");
            console.log(user);

            db.schema.User.findOne({"tracks.name": "trackName"}, {"tracks.$": 1})
                .populate("track.axis.dataPoints")
                .exec(function(err, thing){
                    var user = thing.toObject();
                    user.tracks.forEach(function(j){
                        j.axis.forEach(function(i){
                            delete i.dataPoints;
                        })
                    });

                    console.log(user);

                    test.done();
                });
        });
    }
};