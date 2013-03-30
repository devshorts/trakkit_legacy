var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    twitterId: String,
    facebookId: String,
    googleId: String,
    photoUrl: String,
    email: String
});
var dataPointSchema = new mongoose.Schema({
    xAxis: String,
    yAxis: String
});
var trackSchema = new mongoose.Schema({
    dataPoints: [
        dataPointSchema
    ],
    name: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});
exports.User = mongoose.model('User', userSchema);
exports.DataPoint = mongoose.model('DataPoint', dataPointSchema);
exports.Track = mongoose.model('Track', trackSchema);
var db = (function () {
    function db() { }
    db.prototype.init = function (dbName, ignoreFailures) {
        if(dbName == null) {
            dbName = "trakkit";
        }
        try  {
            mongoose.connect('localhost', dbName);
        } catch (e) {
            if(!ignoreFailures) {
                throw e;
            }
        }
    };
    db.prototype.disconnect = function () {
        mongoose.disconnect();
    };
    db.prototype.newUser = function () {
        var u = exports.User;
        return new (u)();
    };
    db.prototype.newDataPoint = function () {
        var d = exports.DataPoint;
        return new (d)();
    };
    db.prototype.newTrack = function () {
        var t = exports.Track;
        return new (t)();
    };
    db.prototype.newObjectId = function (id) {
        return mongoose.Types.ObjectId(id);
    };
    db.prototype.pruneObject = function (data) {
        var obj = data.toObject();
        if(obj.hasOwnProperty("_id")) {
            delete obj._id;
        }
        if(obj.hasOwnProperty("_v")) {
            delete obj._v;
        }
        return obj;
    };
    db.prototype.extractMongoFields = function (item, name) {
        var ret = {
        };
        for(var key in item) {
            if(key != "_v" && key != "_id") {
                ret[name + ".$." + key] = item[key];
            }
        }
        return ret;
    };
    db.prototype.extractIds = function (items) {
        return items.map(function (item) {
            return item._id;
        });
    };
    db.prototype.saveAll = function (docs, callback) {
        var count = 0;
        docs.forEach(function (doc) {
            doc.save(function () {
                count++;
                if(count == docs.length) {
                    callback();
                }
            });
        });
    };
    return db;
})();
exports.db = db;
//@ sourceMappingURL=schema.js.map
