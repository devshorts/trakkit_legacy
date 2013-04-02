/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/31/13
 * Time: 6:18 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../def/all.d.ts" />

import db = module("../storage/storageContainer");

import base = module("./requestBase");

export class trackRoutes {

    constructor(app:ExpressApplication) {
        var requestUtils = new base.requestBase();

        app.get("/track/:id", requestUtils.ensureAuthenticated, (req, res) =>{
            db.trackStorage.getTrack(req.params.id, track => {
                if(track.user.equals(req.user._id)){
                    res.send(<any>track.toObject());
                }
                else{
                    res.json(false);
                }
            });
        });

        app.post("/dataPoint/update", requestUtils.ensureAuthenticated, (req, res) =>{
            var body:any = <any>(req.body);

            var trackId = body.trackId;

            var dataPoint:IDataPoint = <IDataPoint>(body.dp);

            var mappedDp = db.storage.newDataPoint();
            mappedDp.xAxis = dataPoint.xAxis;
            mappedDp.yAxis = dataPoint.yAxis;
            if(dataPoint._id != null){
                mappedDp._id = db.storage.newObjectId(dataPoint._id);
            }

            db.trackStorage.updateDataPoint(trackId, dataPoint, track => res.send(track.toObject()));
        })

        app.post("/track/add", requestUtils.ensureAuthenticated, (req, res) =>{
            var trackName:string = <any>(req.body).title;

            db.trackStorage.addTrack(req.user, trackName, () => this.queryFullUser(req, res));
        })

        app.del("/track/:id", requestUtils.ensureAuthenticated, (req, res) =>{
            db.trackStorage.safeRemoveTrack(req.params.id, req.user, (err) => {
                if(!err){
                    this.queryFullUser(req, res);
                }
                else{
                    res.json(false);
                }
            })
        })
    }

    queryFullUser(req, res){
        db.userStorage.getTracksForUser(req.user, user => res.send(user.toObject()));
    }
}