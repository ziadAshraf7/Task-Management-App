import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskService } from './task.interface';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { generateObjectId } from 'src/utills/utills';

export const TASK_SERVICE_IMP_TOKEN = "TaskServiceImp"

@Injectable()
export class TaskServiceImp implements TaskService {

   constructor(@InjectModel(Task.name) private readonly taskModel : Model<Task> ,
                ) {}
    
    
    async findCreatedTasks(
        userId: string, 
        category: string , 
        title: string  ,
        completed : 'completed' | "pending"  , 
        dueDate : "ASC" | "DESC"
    ): Promise<Task[]> {
        const query : any = { createdUser: generateObjectId(userId) };
        const sort : any = {}
        if (title) query.title = title;
        if (category) query.category = category;
        if(completed) completed === "completed" ? query.completed = true : query.completed = false
        if(dueDate) dueDate == "ASC" ?  sort.dueDate = 1 : sort.dueDate = -1
        const tasks = await this.taskModel.find(query).sort(sort).populate("createdUser").exec();
        return tasks;
    }
    
    
    async findCompletedTasks(userId: string) {
        const tasks = await this.taskModel.find({completed : true , createdUser : generateObjectId(userId)})
        return tasks
    }
    
    async findByCategory(category: string , userId : string): Promise<Task[]> {
        const tasks = await this.taskModel.find({category : category , createdUser : generateObjectId(userId)})
        return tasks
    }
   
    private async findById(id: string): Promise<Task | null> {
        const taskObjectId = generateObjectId(id)
        const task = await this.taskModel.findById(taskObjectId)
        return task
    }

    async findAllByUserId(userId : string ): Promise<Task[]> {
        const userObjectId = generateObjectId(userId)
        const tasks = await this.taskModel.find({createdUser : userObjectId})
        return tasks
    }
      
   
}
