/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/14/13
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="../def/all.d.ts"/>
///<reference path="../storage/schema.ts"/>

import db = module("../storage/storageContainer");

var log = require("../utils/log")

export var group = {
    init: (t:ITest) =>{
        db.storage.init("test", true);
        db.schema.User.remove({},
            () => db.schema.DataPoint.remove({},
                () => db.schema.Track.remove({},
                    () => t.done())));
    },

    test: (t:ITest) =>{
        var u = db.storage.newUser();

        u.name = "test";

        u.save(()=> {
            db.schema.User.findOne(u._id, (err, user) => {
                console.log(user.name);

                db.schema.User.find(u._id)
                    .where("_id").equals(u._id)
                    .exec((err, u1) => {
                        console.log(u1);

                        t.equal(u1[0].name, u.name);
                        t.done();
                    });
            });
        });
    },

    manyPoints: (t:ITest) =>{
        var u = db.storage.newUser();
        u.name = "manyPoints";
        u.save(() =>{

            var dpList = new IDataPoint[];

            for(var i = 0;i<100;i++){
                var dp = db.storage.newDataPoint();
                dp.xAxis = "x" + i;
                dp.yAxis = "y" + i;
                dp.user = u;
                dpList.push(dp);
            }

            db.storage.saveAll(dpList, ()=>{
                console.log(u._id);

                var id = db.storage.newObjectId(u._id);

                db.schema.DataPoint.find({"user._id" : u._id }, (err, dataPoints) => {
                    console.log(dataPoints);
                    t.done();
                })
            });

        })
    },

    buildTrack: (t:ITest) =>{
        var u = db.storage.newUser();
        u.name = "buildTrackUser";
        u.save(() =>{
            u.name = "crapper";
            u.save(() =>
                createTrack(t, u, _ =>
                        createTrack(t, u, _ =>
                                db.userStorage.getTracksForUser(u, (foundUser) => {
                                    t.equal(foundUser.tracks.length, 2);
                                    t.done();
                                })
                        )
                ));
        });
    },

    removeTrackPoints: (test:ITest) => {
        var u = db.storage.newUser();
        u.name = "updateTrackPoints";
        u.save(() =>{
            createTrack(test, u, track =>{
                var currentPoints = track.dataPoints.length;
                var filteredPoints = track.dataPoints.filter(elem => elem.xAxis == "x0");

                db.trackStorage.removeDataPoints(track, filteredPoints, err => {
                    if(err){
                        log.debug(err);
                        test.done();
                        return;
                    }

                    db.userStorage.getTracksForUser(u, foundUser => {
                        var foundTrack:ITrack = foundUser.tracks[0];
                        test.equal(foundTrack.dataPoints.length, currentPoints - 1);
                        test.done();
                    })
                })

            });
        });
    },

    updateTrackPoints: (t:ITest) =>{
        var u = db.storage.newUser();
        u.name = "updateTrackPoints";
        u.save(() =>{
            u.name = "crapper";
            u.save(() =>
                createTrack(t, u, insertedTrack =>
                        db.userStorage.getTracksForUser(u, (foundUser) => {
                            t.equal(foundUser.tracks.length, 1);

                            var point:IDataPoint = foundUser.tracks[0].dataPoints[4];
                            var track = foundUser.tracks[0];
                            point.xAxis = "xAxis";
                            point.yAxis = "yAxis";

                            db.trackStorage.updateDataPoint(track, point, (err) =>{
                                db.userStorage.getTracksForUser(u, user =>{
                                    t.equal(user.tracks[0].dataPoints[4].xAxis, point.xAxis);
                                    t.equal(user.tracks[0].dataPoints[4].yAxis, point.yAxis);
                                    t.done();
                                })
                            });
                        })
                ));
        });
    },

    end: (t:ITest) =>{
        db.storage.disconnect();
        t.done();
    }
}

function createTrack(t:ITest, u:IUser, callback:(track:ITrack) => void){
    var track = db.storage.newTrack();

    for(var i = 0;i<5;i++){
        var dp = db.storage.newDataPoint();
        dp.xAxis = "x" + i;
        dp.yAxis = "y" + i;
        dp.user = u;
        track.dataPoints.push(dp);
    }

    track.user = u._id;

    track.save(()=>{
        db.schema.Track.findOne(track._id)
            .populate("user")
            .exec((err, tr:ITrack) =>{
                callback(tr);
            });
    });
}