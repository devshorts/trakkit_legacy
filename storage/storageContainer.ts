/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/22/13
 * Time: 5:05 PM
 * To change this template use File | Settings | File Templates.
 */


import schemaImport = module("./schema");
import users = module("./userStorage");
import tracks = module("./trackStorage")


export var storage:schemaImport.db = new schemaImport.db();
export var userStorage:users.userStorage = new users.userStorage();
export var schema = schemaImport;
export var trackStorage:tracks.trackStorage = new tracks.trackStorage();
