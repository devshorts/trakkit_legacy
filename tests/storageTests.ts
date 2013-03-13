/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/13/13
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="../storage/db.ts"/>

import db = module("../storage/db");
import storage = db.storage;
import data = db.storage.schema;

class TestHelpers{

    addTrackForUser(user:IUser, callback:Function){
        var axis = new data.Axis({name:"axis"});
        var track = new data.Track({name: "trackName"});
        var track2 = new data.Track({name: "trackName2"});

        track.axis = [axis, axis];
        user.tracks = [track, track2];

        var dataPoints = [];
        for(var i=0;i<100;i++){
            var dataPoint = new data.DataPoint({
                value: i.toString(),
                axis: axis
            });
            dataPoints.push(dataPoint);
        }

        user.save(() =>
            storage.findUser(user.name, (err, updatedUser) =>
            {
                storage.saveAll(dataPoints, () => callback(updatedUser));
            })
        );
    };

    addUser(username, callback){
        var name = username;

        var user = new data.User();

        user.name = name;

        user.save(() => storage.findUser(name, (err, u) => this.addTrackForUser(u, callback)));
    }
}

class Tests{
    setUp(callback){
        storage.init("test", true);
        data.User.remove({}, function(err) {
            data.DataPoint.remove({}, function(err){
                callback();
            });
        });
    }

    basicUserWIthDataPoints(test){
        var testHelper:TestHelpers = new TestHelpers();

        testHelper.addUser("test2", function(user){

            var axis:IAxis = user.tracks[0].axis[0];

            data.DataPoint.find(axis._id).exec((err, dp) => {
                test.equal(dp.length, 100, "Did not find data points");
                test.done();
            })
        });
    }

    deleteEndPoint(test){
        var testHelper:TestHelpers = new TestHelpers();

        testHelper.addUser("test2", function(user){
            var axis:IAxis = user.tracks[0].axis[0];

            data.DataPoint.find(axis._id)
                .exec((err, dataPoints) => {
                    test.equal(dataPoints.length, 100, "Didn't pull back enough data points");

                    dataPoints[0].remove((dp) => {
                        data.DataPoint.find(axis._id)
                            .exec((err, points) => {
                                test.equal(points.length, 99, "Did not delete data point");
                                test.done();
                            })
                    })
                });
            });
    }

    end(test){
        storage.disconnect();
        test.done();
    }
}

var tests = new Tests();
export var group = {
    setUp:tests.setUp,
    basicUserWithDataPoints: tests.basicUserWIthDataPoints,
    deleteEndPoint: tests.deleteEndPoint,
    end: tests.end
};