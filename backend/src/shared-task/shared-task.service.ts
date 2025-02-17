import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/task.schema';
import { SharedTask } from './shared-task.schema';
import { Model, Types } from 'mongoose';
import { generateObjectId } from 'src/utills/utills';

@Injectable()
export class SharedTaskService {


    constructor(@InjectModel(SharedTask.name) private readonly sharedTaskModel : Model<SharedTask>){}

    async findSharedTasks(userId: string, category?: string, title?: string): Promise<Task[]> {
        const query: any = { sharedWithUser: generateObjectId(userId) };
    
        const tasksQuery: any = {};
        if (category && typeof category === 'string') tasksQuery.category = category;
        if (title && typeof title === 'string') tasksQuery.title = title;
    
        const sharedTasks = await this.sharedTaskModel
            .find(query)
            .select("task")
            .populate<{task : Task & {_id : Types.ObjectId}}>({
                path: "task",
                match: Object.keys(tasksQuery).length > 0 ? tasksQuery : undefined, // Only apply match if query is not empty
                populate: [
                    { path: "createdUser" },
                    { path: "assignments.userId", model: "User" }
                ]
            })
            .exec();
            const set = new Set()
            return sharedTasks.filter((e : any) => {
                if(!set.has(e.task._id.toString())){
                    set.add(e.task._id.toString())
                    return true
                }
            }).map(e => e.task);
    }

    async findAssignedTasks(userId: string, category?: string | null, title?: string | null): Promise<Task[]> {
        const query: any = { sharedByUser: generateObjectId(userId) };
    
        const tasksQuery: any = {};
        if (category) tasksQuery.category = category;
        if (title) tasksQuery.title = title;
        console.log(tasksQuery , "dsd")
        const sharedTasks  = await this.sharedTaskModel
            .find(query)
            .select("task")
            .populate<{task : Task & {_id : Types.ObjectId}}>({
                path: "task",
                // match: Object.keys(tasksQuery).length > 0 ? tasksQuery : undefined,
                populate: [
                    { path: "createdUser" },
                    { path: "assignments.userId", model: "User" }
                ]
            })
            .exec();
        const set = new Set()
        return sharedTasks.filter((e : any) => {
            if(!set.has(e.task._id.toString())){
                set.add(e.task._id.toString())
                return true
            }
        }).map(e => e.task);
    }
    

}
