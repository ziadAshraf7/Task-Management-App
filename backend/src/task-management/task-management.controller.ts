import { Body, Controller, Inject, Post } from '@nestjs/common';
import { TaskService } from 'src/task/task.interface';
import { Task } from 'src/task/task.schema';
import { TASK_MANAGEMENT_SERVICE_TOKEN } from './task-management.service';
import CreateTaskDto from './dto/createTask.dto';
import { TaskManagementService } from './task-managemnr.interface';

@Controller('task-management')
export class TaskManagementController {
    
    constructor(@Inject(TASK_MANAGEMENT_SERVICE_TOKEN) 
    private readonly taskManagmentService: TaskManagementService) {}
    
    @Post()
    async addTask(@Body() taskDto: CreateTaskDto): Promise<Task | null> {
        return this.taskManagmentService.addTask(taskDto);
    }
}
