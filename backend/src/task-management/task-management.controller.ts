import { Body, Controller, Delete, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { Task } from 'src/task/task.schema';
import { TASK_MANAGEMENT_SERVICE_TOKEN } from './task-management.service';
import CreateTaskDto from './dto/createTask.dto';
import { TaskManagementService } from './task-managemnr.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskAssignmentDto } from 'src/task/dto/taskAssignment.dto';
import UpdatedTaskDto from 'src/task/dto/updateTask.dto';

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
    async assignTask(@Body() taskAssignmentDto : TaskAssignmentDto , @Request() req) : Promise<any> {    
        await this.taskManagmentService.assignTask(taskAssignmentDto , req.user.userId)
        return {data : "assigned"}
    }

    @Post("/unAssign")
    async unAssignTask(@Body() taskAssignmentDto : TaskAssignmentDto , @Request() req) : Promise<any> {    
        await this.taskManagmentService.unAssignTask(taskAssignmentDto , req.user.userId)
        return {data : "unAssigned"}
    }

    @Delete("/:taskId")
    async deleteTask(@Param("taskId") taskId : string , @Request() req) : Promise<any> {    
        await this.taskManagmentService.deleteTask(taskId , req.user.userId)
        return {data : "deleted"}
    }

    @Put("")
    async updateTask(@Body() updatedTaskDto: UpdatedTaskDto , @Request() req): Promise<Task | null> {
        return this.taskManagmentService.updateTask(updatedTaskDto , req.user.userId );
    }
}
