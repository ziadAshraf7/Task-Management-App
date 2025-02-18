import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/task.schema';
import { SharedTask } from './shared-task.schema';
import { Model, Types } from 'mongoose';
import { generateObjectId } from 'src/utills/utills';

@Injectable()
export class SharedTaskService {


    constructor(@InjectModel(SharedTask.name) private readonly sharedTaskModel : Model<SharedTask>){}

    async findSharedTasks(userId: string, 
        category?: string, 
        title?: string ,
        completed? : "completed" | "pending" 
    ): Promise<Task[]> {
        const query: any = { sharedWithUser: generateObjectId(userId) };
    
        const tasksQuerySearch: any = {};
        if (category) tasksQuerySearch.category = category;
        if (title) tasksQuerySearch.title = title;
        if(completed) completed == 'completed' ? tasksQuerySearch.completed = true : tasksQuerySearch.completed = false

        const sharedTasks = await this.sharedTaskModel
            .find(query)
            .select("task")
            .populate<{task : Task & {_id : Types.ObjectId}}>({
                path: "task",
                match: Object.keys(tasksQuerySearch).length > 0 ? tasksQuerySearch : undefined, 
                populate: [
                    { path: "createdUser" },
                    { path: "assignments.user", model: "User" }
                ]
            })
            .exec();

            const set = new Set()
            return sharedTasks.filter((e : any) => {
                if(e.task && !set.has(e.task._id.toString())){
                    set.add(e.task._id.toString())
                    return true
                }
            }).map(e => e.task);
    }

    async findAssignedTasks(userId: string, 
        category?: string | null, 
        title?: string | null ,
        completed? : "completed" | "pending"
    ): Promise<Task[]> {
        const query: any = { sharedByUser: generateObjectId(userId) };
    
        const tasksQuerySearch: any = {};
        if (category  ) tasksQuerySearch.category = category;
        if (title  ) tasksQuerySearch.title = title;
        if(completed) completed == 'completed' ? tasksQuerySearch.completed = true : tasksQuerySearch.completed = false

        const sharedTasks  = await this.sharedTaskModel
            .find(query)
            .select("task")
            .populate<{task : Task & {_id : Types.ObjectId}}>({
                path: "task",
                match: Object.keys(tasksQuerySearch).length > 0 ? tasksQuerySearch : undefined,
                populate: [
                    { path: "createdUser" },
                    { path: "assignments.user", model: "User" }
                ]
            })
            .exec();
        const set = new Set()
        return sharedTasks.filter((e : any) => {
            if(e.task && !set.has(e.task._id.toString())){
                set.add(e.task._id.toString())
                return true
            }
        }).map(e => e.task);
    }
    

}
