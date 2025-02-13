import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/task/task.interface';
import { Task } from 'src/task/task.schema';
import { TASK_MANAGEMENT_SERVICE_TOKEN } from './task-management.service';
import CreateTaskDto from './dto/createTask.dto';
import { TaskManagementService } from './task-managemnr.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskAssignmentDto } from 'src/task/dto/taskAssignment.dto';
import { SharedTaskService } from 'src/shared-task/shared-task.service';

@Controller('task-management')
@UseGuards(AuthGuard)
export class TaskManagementController {
    
    constructor(@Inject(TASK_MANAGEMENT_SERVICE_TOKEN) 
    private readonly taskManagmentService: TaskManagementService ,
    ) {}
    
    @Post()
    async addTask(@Body() taskDto: CreateTaskDto , @Request() req): Promise<Task | null> {
        return this.taskManagmentService.addTask(taskDto , req.user.userId);
    }

    @Post("/assign")
    async assignTask(@Body() taskAssignmentDto : TaskAssignmentDto , @Request() req) : Promise<string | null> {    
        await this.taskManagmentService.assignTask(taskAssignmentDto , req.user.userId)
        return "assigned"
    }

}
