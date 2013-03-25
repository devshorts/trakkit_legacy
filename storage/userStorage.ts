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
    public getTracksForUser(user:IUser, callback:(IUser) => void){
        schema.Track.find({"user" : user._id}, (err, tracks) =>{
            user.tracks = tracks;
            callback(user);
        })
    }

    public getTwitterUser(twitterId:String, callBack:(IUser) => void){

    }
}
