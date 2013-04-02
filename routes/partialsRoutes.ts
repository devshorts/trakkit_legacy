/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 4/2/13
 * Time: 9:43 AM
 * To change this template use File | Settings | File Templates.
 */

import requestBase = module("requestBase")

export class partialsRoutes{
    constructor(app:ExpressApplication){
        var requestUtils = new requestBase.requestBase();
        app.get("/partials/:view", requestUtils.ensureAuthenticated, (req, res) => {
            res.render(req.params.view, this.dataForView(req.params.view))
        })
    }

    dataForView(viewName:string):Object{
        return null;
    }
}