import {  Controller, Delete, Get, Inject, Param , UseGuards , Request, Query} from '@nestjs/common';
import { TaskService } from './task.interface';
import { TASK_SERVICE_IMP_TOKEN } from './task.service';
import { Task } from './task.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { userPayload } from 'src/utills/utills';
import { TaskQueryDto } from 'src/dto/taskQuerySearch.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {

    constructor(@Inject(TASK_SERVICE_IMP_TOKEN) 
    private readonly taskService: TaskService,
    ) {}

    @Get()
    async getAllTasksByUserId(@Request() req : {user : userPayload}, 
    @Query() taskQueryDto : TaskQueryDto ) : Promise<Task[] | null> {
        return this.taskService.findCreatedTasks(
            req.user.userId , 
            taskQueryDto?.category , 
            taskQueryDto?.title ,
            taskQueryDto?.completed ,
            taskQueryDto?.dueDate
        ) 
           
    }

    @Get("/category/:categoryName")
    async findByCategory(@Param("categoryName") 
    category : string , @Request() req : {user : userPayload}) : Promise<Task[]> {
        return this.taskService.findByCategory(category , req.user.userId)
    }
}
