import store from "../_redux/store";


export type userInfo = {
    email : string ,
    name : string , 
    id : string
} 

export interface userCookieData {
    state: userCookieData;
    accessToken : string ,
    user : userInfo
} 

export type AppDispatch = typeof store.dispatch;


export type endPointsMethods = 'getTasks' 

export type eventHandler = React.ChangeEvent<HTMLInputElement>


export type User = {
    _id : string ,
    name : string ,
    email : string ,
    password : string ,
    image : string ,
    tasks : Task[]
    userTasksCategories : string[]
}



export type Task = {
    _id : string , 
    title : string , 
    description : string , 
    assignments : {user : User , assignedAt : string}[] , 
    createdUser : User , 
    completed : boolean , 
    dueDate : string , 
    category : string ,
    createdAt : string , 
    updatedAt : string
}

export type SharedTask = {
    _id : string ,
    sharedByUser : User , 
    sharedWithUser : User ,
}
export type tasksSearchParams = {
    
}