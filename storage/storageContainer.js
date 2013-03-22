var schemaImport = require("./schema")
var users = require("./userStorage")
exports.storage = new schemaImport.db();
exports.userStorage = new users.userStorage();
exports.schema = schemaImport;
//@ sourceMappingURL=storageContainer.js.map
