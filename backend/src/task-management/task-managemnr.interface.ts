import { Task } from "src/task/task.schema";
import CreateTaskDto from "./dto/createTask.dto";
import { TaskAssignmentDto } from "src/task/dto/taskAssignment.dto";



export interface TaskManagementService {
    addTask(createTaskDto : CreateTaskDto , userId : string) : Promise<Task | null>
    assignTask( taskAssignmentDto : TaskAssignmentDto , userId : string) : Promise<any>
    unAssignTask( taskAssignmentDto : TaskAssignmentDto , userId : string) : Promise<any>
}