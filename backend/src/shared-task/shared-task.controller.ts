import { Controller, UseGuards ,Request, Get, Query } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SharedTaskService } from "./shared-task.service";
import { Task } from "src/task/task.schema";
import { userPayload } from "src/utills/utills";
import { TaskQueryDto } from "src/dto/taskQuerySearch.dto";



@Controller('shared-tasks')
@UseGuards(AuthGuard)
export class SharedTasksController {
    
    constructor(private readonly sharedTasksService: SharedTaskService) {}

    @Get("")
    async getSharedTasks(@Request() req: {user : userPayload} , 
    @Query() taskQueryDto : TaskQueryDto , 
    ): Promise<Task[] > {
        return this.sharedTasksService.findSharedTasks(req.user.userId , 
            taskQueryDto.category , taskQueryDto.title , taskQueryDto.completed)
    }

    @Get("assigned")
    async getAssignedTasks(@Request() req: {user : userPayload} , 
    @Query() taskQueryDto : TaskQueryDto , 
    ): Promise<Task[] > {
        return this.sharedTasksService.findAssignedTasks(req.user.userId , 
            taskQueryDto.category , taskQueryDto.title , taskQueryDto.completed)
    }


}