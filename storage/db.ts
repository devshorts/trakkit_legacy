///<reference path="schema.ts"/>

import Schema = module("schema");


    export class storage{
        static log: any = require("../utils/log.js");

        static mongoose: any = require("mongoose");

        static schema: Schema = new Schema.Schema();

        static init(dbName:string, ignoreFailures:bool){
            if(dbName == null){
                dbName = "trakkit";
            }

            try{
                mongoose.connect('localhost', dbName);

                log.debug("database connected");
            }
            catch(e){
                if(!ignoreFailures){
                    throw e;
                }
            }
        }

        static disconnect(){
            mongoose.disconnect();
        }

        static saveAll(docs:any, callback:() => any){
            var count = 0;
            docs.forEach(function(doc){
                doc.save(function(err){
                    count++;
                    if( count == docs.length ){
                        callback();
                    }
                });
            });
        }

        static findUser(name:String, callback:(error:any, user:IUser) => void){
            schema.User.findOne({name: name}, callback);
        }
    }
