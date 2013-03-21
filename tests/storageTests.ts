///**
// * Created with JetBrains WebStorm.
// * User: anton.kropp
// * Date: 3/13/13
// * Time: 12:19 PM
// * To change this template use File | Settings | File Templates.
// */
//
/////<reference path="../storage/schema.ts"/>
/////<reference path="../storage/db.ts"/>
//
//import db = module("../storage/db");
//import storage = db.storage;
//import Axis = db.storage.data.AxisData;
//import Track = db.storage.data.TrackData;
//import User = db.storage.data.UserData;
//import DataPoint = db.storage.data.DataPointData;
//
//class TestHelpers{
//    addTrackForUser(user:User, callback:Function){
//        var t:Axis = db.storage.data.AxisData;
////        var axis:Axis = new Axis({name:"axis"});
////        var track:Track = new Track({name: "trackName"});
////        var track2:Track = new Track({name: "trackName2"});
////
////        track.axis = [axis, axis];
////
////        user.tracks = [track, track2];
////
////        var dataPoints = [];
////        for(var i=0;i<100;i++){
////            var dataPointSchema = new DataPoint({
////                value: i.toString(),
////                axis: axis
////            });
////            dataPoints.push(dataPointSchema);
////        }
////
////        user.save(() =>
////            storage.findUser(user.name, (err, updatedUser) =>
////            {
////                storage.saveAll(dataPoints, () => callback(updatedUser));
////            })
////        );
//    };
//
//    addUser(username, callback){
////        var name = username;
////
////        var user:User = new User();
////
////        user.name = name;
////
////        user.save(() => storage.findUser(name, (err, u) => this.addTrackForUser(u, callback)));
//    }
//}
//
//class Tests{
//    setUp(callback){
//        var t:Axis = db.storage.data.AxisData;
//        storage.init("test", true);
//        User.remove({}, (err) => {
//            DataPoint.remove({}, (err) => { callback(); });
//        });
//    }
//
//    basicUserWIthDataPoints(test:ITest){
//        var testHelper:TestHelpers = new TestHelpers();
//
//        testHelper.addUser("test2", function(user){
//
//            var axis:Axis = user.tracks[0].axis[0];
//
//            DataPoint.find(axis._id).exec((err, dp) => {
//                test.equal(dp.length, 100, "Did not find data points");
//                test.done();
//            })
//        });
//    }
//
//    deleteEndPoint(test:ITest){
//        var testHelper:TestHelpers = new TestHelpers();
//
//        testHelper.addUser("test2", (user:User) => {
//            var axis:Axis = user.tracks[0].axis[0];
//
//            DataPoint
//                .find(axis._id)
//                .exec((err, dataPoints:Array) => {
//                    test.equal(dataPoints.length, 100, "Didn't pull back enough data points");
//
//                    dataPoints[0].remove(
//                        dp => {
//                            DataPoint
//                                .find(axis._id)
//                                .exec((err, points:Array) => {
//                                    test.equal(points.length, 99, "Did not delete data point");
//                                    test.done();
//                                })
//                    })
//                });
//            });
//    }
//
//    end(test){
//        storage.disconnect();
//        test.done();
//    }
//}
//
////var tests = new Tests();
////
////export var group = {
////    setUp:tests.setUp,
////    basicUserWithDataPoints: tests.basicUserWIthDataPoints,
////    deleteEndPoint: tests.deleteEndPoint,
////    end: tests.end
////};
//
