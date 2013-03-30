/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/29/13
 * Time: 11:36 AM
 * To change this template use File | Settings | File Templates.
 */


export class requestBase{

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else{
            res.redirect('/auth/twitter');
            return null;
        }
    }
}
