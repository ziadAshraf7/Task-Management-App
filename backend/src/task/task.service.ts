import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
   

   async delete(id: string): Promise<void> {
        const taskObjectId = generateObjectId(id)
        const task = await this.findById(id) 
        if(task == null) throw new NotFoundException("task is not found")
        
        try{
            await this.taskModel.findByIdAndDelete(taskObjectId)
        }catch(e){
            Logger.error(e)
            throw new InternalServerErrorException("cannot delete task")
        }
    }

    async update(id: string, updatedTaskDto: UpdatedTaskDto): Promise<Task | null> {
        const taskObjectId : Types.ObjectId = generateObjectId(id)
        if(updatedTaskDto.completed != null && !updatedTaskDto.completed ) {
            throw new BadRequestException("you cannot undo the completed status of the task")
        }
        await this.findById(id)
        try{
            return await this.taskModel.findByIdAndUpdate(taskObjectId , updatedTaskDto , {new : true})
        }catch(e) {
            Logger.error(e)
            throw new NotFoundException("user does not exists")
        }    
    }
   
    async findById(id: string): Promise<Task | null> {
        const taskObjectId = generateObjectId(id)
        const task = await this.taskModel.findById(taskObjectId)
        if(task == null) throw new NotFoundException("task is not found")
        return task
    }

    async findAllByUserId(userId : string): Promise<Task[]> {
        const userObjectId = generateObjectId(userId)
        const tasks = await this.taskModel.find({user : userObjectId})
        return tasks
    }
      
   
}
