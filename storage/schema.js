var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String
});
var dataPointSchema = new mongoose.Schema({
    xAxis: String,
    yAxis: String,
    user: [
        userSchema
    ]
});
exports.User = mongoose.model('User', userSchema);
exports.DataPoint = mongoose.model('DataPoint', dataPointSchema);
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
        return new exports.User();
    };
    db.prototype.newDataPoint = function () {
        return new exports.DataPoint();
    };
    db.prototype.newObjectId = function (id) {
        return mongoose.Schema.ObjectId(id);
    };
    db.prototype.saveAll = function (docs, callback) {
        var count = 0;
        docs.forEach(function (doc, _, _) {
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
