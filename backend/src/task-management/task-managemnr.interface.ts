import { Task } from "src/task/task.schema";
import CreateTaskDto from "./dto/createTask.dto";



export interface TaskManagementService {
    addTask(createTaskDto : CreateTaskDto , userId : string) : Promise<Task | null>
}