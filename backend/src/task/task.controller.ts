import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreateTaskDto from '../task-management/dto/createTask.dto';
import { TaskService } from './task.interface';
import { TASK_SERVICE_IMP_TOKEN } from './task.service';
import { Task } from './task.schema';
import UpdatedTaskDto from './dto/updateTask.dto';

@Controller('tasks')
export class TaskController {

    constructor(@Inject(TASK_SERVICE_IMP_TOKEN) private readonly taskService: TaskService) {}

    @Get(":id")
    async getAllTasksByUserId(@Param("id") userId : string ) : Promise<Task[]> {
        return this.taskService.findAllByUserId(userId)
    }

    @Delete(":id")
    async deleteTaskByTaskId(@Param("id") taskId : string) : Promise<any> {
        await this.taskService.delete(taskId)
        return "Deleted Successfully"
    }

    @Put(":id")
    async updateTask(@Param("id") taskId : string , @Body() taskDto : UpdatedTaskDto) : Promise<Task | null> {
        return await this.taskService.update(taskId , taskDto)
    }
}
