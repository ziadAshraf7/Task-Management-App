import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TaskManagementService } from './task-managemnr.interface';
import { Task } from 'src/task/task.schema';
import CreateTaskDto from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { generateObjectId } from 'src/utills/utills';

export const TASK_MANAGEMENT_SERVICE_TOKEN = "TaskManagementServiceImp"

@Injectable()
export class TaskManagementServiceImp implements TaskManagementService {

      
      constructor(@InjectModel(Task.name) private readonly taskModel : Model<Task> ,
                  @InjectModel(User.name) private readonly userModel : Model<User> ,
                      ) {}
    
    
      async addTask(createTaskDto: CreateTaskDto): Promise<Task | null> {
                    const userObjectId = generateObjectId(createTaskDto.userId)
    
                    const user = await this.userModel.findById(userObjectId)
                    if(user == null) throw new NotFoundException("user does not exists")
                        
                    const {userId , ...taskData} = createTaskDto
                    const newTask = new this.taskModel({...taskData, user: userObjectId }); 
                 
                   try{
                     var savedTask =  await newTask.save()
                    }catch(e){
                        Logger.error(e)
                        throw new InternalServerErrorException("cannot add new task")
                    }
                    
                    try{
                        await this.userModel.findByIdAndUpdate(
                                userObjectId ,
                                {$push: { tasks: savedTask._id } }
                            )
                        return savedTask
                    }catch(e){
                        Logger.error(e , "error while creating task")
                        throw new InternalServerErrorException("error while creating task")
                    }
        }
        
       
}
