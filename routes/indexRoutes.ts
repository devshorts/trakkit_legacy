/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/31/13
 * Time: 5:02 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../def/all.d.ts" />

import routeBase = module("requestBase")

interface IJadeView{
    title:string;
}

export class indexRoutes{
    constructor(app:ExpressApplication) {
        var utils =  new routeBase.requestBase();

        app.get("/", utils.ensureAuthenticated, (req, res) => {
            res.redirect("/home");
        });

        app.get("/home", utils.ensureAuthenticated, (req, res) => {
            res.render("index", { title: "TRAKKIT"});
        });

        app.get("/login", (req, res) => {
            res.render("login", { title: "Trakkit Login"});
        });
    }
}