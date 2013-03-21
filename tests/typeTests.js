var schema = require("../storage/schema")
var storage = new schema.db();
exports.group = {
    init: function (t) {
        storage.init("test", true);
        schema.User.remove({
        }, function () {
            return schema.DataPoint.remove({
            }, function () {
                return t.done();
            });
        });
    },
    test: function (t) {
        var u = storage.newUser();
        u.name = "test";
        u.save(function () {
            schema.User.findOne(u._id, function (err, user) {
                console.log(user.name);
                schema.User.find(u._id).where("_id").equals(u._id).exec(function (err, u1) {
                    console.log(u1);
                    t.equal(u1[0].name, u.name);
                    t.done();
                });
            });
        });
    },
    manyPoints: function (t) {
        var u = storage.newUser();
        u.name = "manyPoints";
        u.save(function () {
            var dpList = new Array();
            for(var i = 0; i < 100; i++) {
                var dp = storage.newDataPoint();
                dp.xAxis = "x" + i;
                dp.yAxis = "y" + i;
                dp.user = u;
                dpList.push(dp);
            }
            storage.saveAll(dpList, function () {
                console.log(u._id);
                var id = storage.newObjectId(u._id);
                schema.DataPoint.find({
                    "user._id": u._id
                }, function (err, dataPoints) {
                    console.log(dataPoints);
                    t.done();
                });
            });
        });
    },
    end: function (t) {
        storage.disconnect();
        t.done();
    }
};
//@ sourceMappingURL=typeTests.js.map
