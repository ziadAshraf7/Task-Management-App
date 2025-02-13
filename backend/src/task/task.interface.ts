import { TaskAssignmentDto } from "./dto/taskAssignment.dto"
import UpdatedTaskDto from "./dto/updateTask.dto"
import { Task } from "./task.schema"


export interface TaskService {
        delete(id : string , req : Request) : Promise<void>
        update(id : string , updateUserDto : UpdatedTaskDto , req : Request) : Promise<Task | null>
        findAllByUserId(userId : string) : Promise<Task[]>
        findByCategory(category : string , userId : string) : Promise<Task[]>
        findCompletedTasks(userId : string)
}