/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/28/13
 * Time: 6:01 PM
 * To change this template use File | Settings | File Templates.
 */

import db = module("../storage/storageContainer");

import routeBase = module("requestBase")

export class twitterRoutes extends routeBase.requestBase{
    constructor(app:ExpressApplication) {
        super();

        app.get("/twitter/success", (req, res) => {
            res.send(req.user.name);
        });
    }
}
