import store from "../_redux/store";


interface userInfo {
    email : string ,
    id : string , 
    name : string 
}

export interface userCookieData {
    state: userCookieData;
    accessToken : string ,
    user : userInfo
} 

export type AppDispatch = typeof store.dispatch;


export type endPointsMethods = 'getTasks' 

export type eventHandler = React.ChangeEvent<HTMLInputElement>