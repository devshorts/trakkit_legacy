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