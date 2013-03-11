/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/8/13
 * Time: 12:21 PM
 * To change this template use File | Settings | File Templates.
 */

var log4js = require('log4js');
var logger = log4js.getLogger();

log4js.configure({
    "appenders": [
        {
            type: "console"
            , category: "console"
        },
        {
            "type": "dateFile",
            "filename": "logs/debug.log",
            "pattern": "-yyyy-MM-dd"
        }
    ],
    replaceConsole:true
});

log = log4js.getLogger("test");

exports.debug = function(str){
    log.debug(str);
}