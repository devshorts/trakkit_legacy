/**
 * Created with JetBrains WebStorm.
 * User: anton.kropp
 * Date: 3/29/13
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */

declare class IPassportName{
    familyName:String;
    givenName:String;
    middleName:String;
}

declare class IPassportEmail{
    value:String;
    type:String;
}

declare class IPassportPhotos{
    value:String;
}

declare class IPassportProvider{
    provider:String;
    id:String;
    displayName: String;
    name:IPassportName;
    emails:IPassportEmail[];
    photos:IPassportPhotos[];
}