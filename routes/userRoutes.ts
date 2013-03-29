/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/28/13
 * Time: 6:12 PM
 * To change this template use File | Settings | File Templates.
 */

import db = module("../storage/storageContainer");

export function init(app:any) {
    app.get("/users", (req, res) => {
        res.send(req.user.name);
    });
}
