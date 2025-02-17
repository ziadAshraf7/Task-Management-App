import { Controller, UseGuards ,Request, Get, Query } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SharedTaskService } from "./shared-task.service";
import { Task } from "src/task/task.schema";
import { userPayload } from "src/utills/utills";



@Controller('shared-tasks')
@UseGuards(AuthGuard)
export class SharedTasksController {
    
    constructor(private readonly sharedTasksService: SharedTaskService) {}

    @Get("")
    async getSharedTasks(@Request() req: {user : userPayload} , @Query('category') category : string , @Query('title') title : string): Promise<Task[] > {
        return this.sharedTasksService.findSharedTasks(req.user.userId , category , title)
    }

    @Get("assigned")
    async getAssignedTasks(@Request() req: {user : userPayload} , @Query('category') category : string , @Query('title') title : string): Promise<Task[] > {
        return this.sharedTasksService.findAssignedTasks(req.user.userId , category , title)
    }
}