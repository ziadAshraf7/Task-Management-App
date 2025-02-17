import { Task } from "src/task/task.schema";
import CreateTaskDto from "./dto/createTask.dto";
import { TaskAssignmentDto } from "src/task/dto/taskAssignment.dto";
import UpdatedTaskDto from "src/task/dto/updateTask.dto";



export interface TaskManagementService {
    addTask(createTaskDto : CreateTaskDto , userId : string) : Promise<Task | null>
    assignTask( taskAssignmentDto : TaskAssignmentDto , userId : string) : Promise<any>
    unAssignTask( taskAssignmentDto : TaskAssignmentDto , userId : string) : Promise<any>
    updateTask( updateUserDto : UpdatedTaskDto , createdUserId : string) : Promise<Task | null>
    deleteTask(id : string , userId : string) : Promise<void>

}