/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/22/13
 * Time: 4:46 PM
 * To change this template use File | Settings | File Templates.
 */

import schema = module("schema");

var storage = new schema.db();


export class userStorage{
    public getUser(id:String, callback:(string, IUser) => void){
        schema.User.findOne({"_id" : id}, (err, user) => callback(err, user));
    }

    public getTracksForUser(user:IUser, callback:(IUser) => void){
        schema.Track.find({"user" : user._id}, (err, tracks) =>{
            user.tracks = tracks;
            callback(user);
        })
    }

    public getTwitterUser(twitterProperties:any, insertIfNull:Boolean, callback:(IUser) => void){
        var twitterId:String = twitterProperties.id;
        var name:String = twitterProperties.displayName;
        var newUser = storage.newUser();

        newUser.name = name;
        newUser.twitterId = twitterId;

        schema.User.findOne({"twitterId" : twitterId}, (err, user) => {
            if(user == null){
                if(insertIfNull){
                    newUser.save(() => callback(newUser));
                }
                else{
                    callback(null);
                }
            }
            else{
                callback(user);
            }
        });
    }
}
