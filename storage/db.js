var Schema = (function () {
    function Schema() { }
    Schema.prototype.get = function () {
        var mongoose = require("mongoose");
        var Schema = mongoose.Schema;
        var dataPoint = new Schema({
            value: String,
            axis: {
                type: Schema.ObjectId,
                ref: "Axis"
            }
        });
        var axis = new Schema({
            name: String
        });
        var track = new Schema({
            name: String,
            axis: [
                axis
            ]
        });
        var user = new Schema({
            name: String,
            tracks: [
                track
            ]
        });
        return {
            "User": mongoose.model("User", user),
            "Track": mongoose.model("Track", track),
            "Axis": mongoose.model("Axis", axis),
            "DataPoint": mongoose.model("DataPoint", dataPoint)
        };
    };
    return Schema;
})();
exports.Schema = Schema;
var storage = (function () {
    function storage() { }
    storage.log = require("../utils/log.js");
    storage.mongoose = require("mongoose");
    storage.schema = (new Schema()).get();
    storage.init = function init(dbName, ignoreFailures) {
        if(dbName == null) {
            dbName = "trakkit";
        }
        try  {
            storage.mongoose.connect('localhost', dbName);
            storage.log.debug("database connected");
        } catch (e) {
            if(!ignoreFailures) {
                throw e;
            }
        }
    };
    storage.disconnect = function disconnect() {
        storage.mongoose.disconnect();
    };
    storage.saveAll = function saveAll(docs, callback) {
        var count = 0;
        docs.forEach(function (doc) {
            doc.save(function (err) {
                count++;
                if(count == docs.length) {
                    callback();
                }
            });
        });
    };
    return storage;
})();
exports.storage = storage;
//@ sourceMappingURL=db.js.map
