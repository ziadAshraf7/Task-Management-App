import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/task.schema';
import { SharedTask } from './shared-task.schema';
import { Model } from 'mongoose';
import { generateObjectId } from 'src/utills/utills';

@Injectable()
export class SharedTaskService {


    constructor(@InjectModel(SharedTask.name) private readonly sharedTaskModel : Model<SharedTask>){}

    async getSharedTasksByUserId(userId : string) : Promise<any> {

        const sharedTasks = await this.sharedTaskModel
        .find({ sharedWithUser: generateObjectId(userId) })
        .select("task")
        .populate("task") 
        .exec();

        console.log(sharedTasks)
         
    }


}
