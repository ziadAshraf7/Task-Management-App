import UpdatedTaskDto from "./dto/updateTask.dto"
import { Task } from "./task.schema"


export interface TaskService {
        delete(id : string) : Promise<void>
        update(id : string , updateUserDto : UpdatedTaskDto) : Promise<Task | null>
        findById(id : string) : Promise<Task | null>
        findAllByUserId(userId : string) : Promise<Task[]>
}