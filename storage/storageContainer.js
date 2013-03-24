var schemaImport = require("./schema")
var users = require("./userStorage")
var tracks = require("./trackStorage")
exports.storage = new schemaImport.db();
exports.userStorage = new users.userStorage();
exports.schema = schemaImport;
exports.trackStorage = new tracks.trackStorage();
//@ sourceMappingURL=storageContainer.js.map
