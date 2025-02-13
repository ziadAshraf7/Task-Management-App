import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Request, UnauthorizedException } from '@nestjs/common';
import { TaskService } from './task.interface';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import UpdatedTaskDto from './dto/updateTask.dto';
import { generateObjectId } from 'src/utills/utills';

export const TASK_SERVICE_IMP_TOKEN = "TaskServiceImp"

@Injectable()
export class TaskServiceImp implements TaskService {

   constructor(@InjectModel(Task.name) private readonly taskModel : Model<Task> ,
                ) {}
   

   async delete(id: string ,req ): Promise<void> {
       
        const authenticatedUser = req.user
        if(authenticatedUser == null) throw new BadRequestException("bad request")


        const taskObjectId = generateObjectId(id)
        const task = await this.findById(id) 
        if(task == null) throw new NotFoundException("task is not found")
        const userTaskId = task.user 
        console.log(userTaskId , "userTaskId")
        if(userTaskId !== authenticatedUser._id) throw new UnauthorizedException("user is not authorized to delete this task")

        try{
            await this.taskModel.findByIdAndDelete(taskObjectId)
        }catch(e){
            Logger.error(e)
            throw new InternalServerErrorException("cannot delete task")
        }
    }

    async update(id: string, updatedTaskDto: UpdatedTaskDto , req ): Promise<Task | null> {
        
        const authenticatedUser = req.user
        if(authenticatedUser == null) throw new BadRequestException("bad request")

        const taskObjectId : Types.ObjectId = generateObjectId(id)
        if(updatedTaskDto.completed != null && !updatedTaskDto.completed ) {
            throw new BadRequestException("you cannot undo the completed status of the task")
        }
        const task = await this.findById(id)
        if(task == null) throw new NotFoundException("task is not found")
        
        const userTaskId = task.user 
        console.log(userTaskId , "userTaskId")
        if(userTaskId !== authenticatedUser._id) throw new UnauthorizedException("user is not authorized to update this task")

        try{
            return await this.taskModel.findByIdAndUpdate(taskObjectId , updatedTaskDto , {new : true})
        }catch(e) {
            Logger.error(e)
            throw new NotFoundException("user does not exists")
        }    
    }
   
   private async findById(id: string): Promise<Task | null> {
        const taskObjectId = generateObjectId(id)
        const task = await this.taskModel.findById(taskObjectId)
        return task
    }

    async findAllByUserId(userId : string ): Promise<Task[]> {
        const userObjectId = generateObjectId(userId)
        const tasks = await this.taskModel.find({user : userObjectId})
        return tasks
    }
      
   
}
