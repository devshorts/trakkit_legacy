/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/22/13
 * Time: 4:46 PM
 * To change this template use File | Settings | File Templates.
 */

import schema = module("schema");
import util = module("../utils/util");

var storage = new schema.db();


export class userStorage{
    getUser(id:String, callback:(string, IUser) => void){
        schema.User.findOne({"_id" : id}, (err, user) => callback(err, user));
    }

    getUserByUsername(userName:String, callback:(string, IUser) => void){
        schema.User.findOne({"name" : userName}, (err, user) => callback(err, user));
    }

    getTracksForUser(user:IUser, callback:(IUser) => void){
        schema.Track.find({"user" : user._id}, (err, tracks) =>{
            user.tracks = tracks;
            (<IUser>(user._doc)).tracks = tracks;
            callback(user);
        })
    }

    getTwitterUser(properties:IPassportProvider, callback:(IUser) => void){
        this.findOrOAuthAddUser(properties, "twitterId", callback);
    }

    getFacebookUser(properties:IPassportProvider, callback:(IUser) => void){
        this.findOrOAuthAddUser(properties, "facebookId", callback);
    }

    getGoogleUser(properties:IPassportProvider, callback:(IUser) => void){
        this.findOrOAuthAddUser(properties, "googleId", callback);
    }

    findOrOAuthAddUser(properties:IPassportProvider, findId:String, callback:(IUser) => void){
        var searchable = {};
        searchable[<any>findId] = properties.id;

        schema.User.findOne(searchable, (err, user) => {
            if(user != null){
                if(user.photoUrl == null){
                    user.photoUrl = "/images/noIcon.jpg";
                }

                callback(user);
            }
            else{
                this.createOAuthUser(properties, findId, callback);
            }
        });
    }

    createOAuthUser (properties:IPassportProvider, findId:String, callback:(IUser) => void) {
        var name:String = properties.displayName;
        var newUser = storage.newUser();

        if(!util.collection.isNullOrEmpty(properties.emails)){
            newUser.email = properties.emails[0].value;
        }

        if(!util.collection.isNullOrEmpty(properties.photos)){
            newUser.photoUrl = properties.photos[0].value;
        }

        if(newUser.photoUrl == null){
            newUser.photoUrl = "/images/noIcon.jpg";
        }

        newUser.name = name;
        newUser[<any>findId] = properties.id;

        newUser.save(() => callback(newUser));
    };
}
