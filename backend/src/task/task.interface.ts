
import { Task } from "./task.schema"


export interface TaskService {
        findAllByUserId(userId : string) : Promise<Task[]>
        findByCategory(category : string , userId : string) : Promise<Task[]>
        findCompletedTasks(userId : string) : Promise<Task[]>
        findCreatedTasks(userId : string , category : string , name : string )  :Promise<Task[]>
}