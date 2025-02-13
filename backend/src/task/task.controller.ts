import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards , Request} from '@nestjs/common';
import CreateTaskDto from '../task-management/dto/createTask.dto';
import { TaskService } from './task.interface';
import { TASK_SERVICE_IMP_TOKEN } from './task.service';
import { Task } from './task.schema';
import UpdatedTaskDto from './dto/updateTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {

    constructor(@Inject(TASK_SERVICE_IMP_TOKEN) private readonly taskService: TaskService) {}

    @Get()
    async getAllTasksByUserId(@Request() req ) : Promise<Task[]> {
        return this.taskService.findAllByUserId(req.user.userId)
    }

    @Delete(":id")
    async deleteTaskByTaskId(@Param("id") taskId : string , @Request() req) : Promise<any> {
        await this.taskService.delete(taskId , req)
        return "Deleted Successfully"
    }

    @Put(":id")
    async updateTask(@Param("id") taskId : string , @Body() taskDto : UpdatedTaskDto , @Request() req) : Promise<Task | null> {
        return await this.taskService.update(taskId , taskDto , req)
    }

    
}
