/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/8/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require("../storage/db.js").storage;

var addTrackForUser = function(user, callback){
    var axis = new db.schema.Axis({name:"axis"});
    var track = new db.schema.Track({name: "trackName"});
    var track2 = new db.schema.Track({name: "trackName2"});
    track.axis = [axis, axis];
    user.tracks = [track, track2];

    var dataPoints = [];
    for(var i=0;i<100;i++){
        var dataPoint = new db.schema.DataPoint({
            value: i.toString(),
            axis: axis
        });
        dataPoints.push(dataPoint);
    }

    user.save(function(){
        db.schema.User.findOne({name: user.name}, function(err, updatedUser){
            db.saveAll(dataPoints, function(){
                callback(updatedUser);
            });
        });
    })
};

var addUser = function(username, callback){
    var name = username;

    var user = new db.schema.User();

    user.name = name;

    user.save(function(){
        db.schema.User.findOne({name: name}, (function(err, u){
            addTrackForUser(u, callback);
        }));
    });
}

module.exports.group = {
    setUp: function(callback){
        db.init("test", true);
        db.schema.User.remove({}, function(err) {
            db.schema.DataPoint.remove({}, function(err){
                callback();
            });
        });
    },

    basicUserWIthDataPoints: function(test){
        addUser("test2", function(user){

            var axis = user.tracks[0].axis[0];

            db.schema.DataPoint.find(axis._id)
                .exec(function(err, dataPoints){
                    test.equal(dataPoints.length, 100, "Didn't pull back enough data points");
                    test.done();
                });
        });
    },

    basicUser: function(test){
        addUser("test1", function(user){
            db.schema.User.findOne({"tracks.name": "trackName"}, {"tracks.$": 1})
                .exec(function(err, user){
                    test.equals(user.tracks[0].name, "trackName");
                    test.done();
                });
        });
    },

    deleteEndPoint: function(test){
        addUser("test2", function(user){

            var axis = user.tracks[0].axis[0];

            db.schema.DataPoint.find(axis._id)
                .exec(function(err, dataPoints){
                    test.equal(dataPoints.length, 100, "Didn't pull back enough data points");

                    dataPoints[0].remove(function(dp){
                        db.schema.DataPoint.find(axis._id)
                            .exec(function(err, points){
                                test.equal(points.length, 99, "Did not delete data point");
                                test.done();
                            })
                    })
                });
        });
    },

    end: function(test){
        db.disconnect();
        test.done();
    }

};