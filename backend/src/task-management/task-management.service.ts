import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TaskManagementService } from './task-managemnr.interface';
import { Task } from 'src/task/task.schema';
import CreateTaskDto from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { generateObjectId } from 'src/utills/utills';
import { TaskAssignmentDto } from 'src/task/dto/taskAssignment.dto';
import { TaskAssignment } from 'src/task/dto/taskAssignment';
import { SharedTask } from 'src/shared-task/shared-task.schema';

export const TASK_MANAGEMENT_SERVICE_TOKEN = "TaskManagementServiceImp"

@Injectable()
export class TaskManagementServiceImp implements TaskManagementService {

      
      constructor(@InjectModel(Task.name) private readonly taskModel : Model<Task> ,
                  @InjectModel(User.name) private readonly userModel : Model<User> ,
                  @InjectModel(SharedTask.name) private readonly sharedTaskModel : Model<SharedTask>
                      ) {}
   

    async unAssignTask(taskAssignmentDto: TaskAssignmentDto, userId: string): Promise<any> {
            
        const taskObjectId = generateObjectId(taskAssignmentDto.taskId)

        const task = await this.taskModel.findById(taskObjectId)
        if(task == null) throw new NotFoundException("task is not found")
       
        if(task.createdUser.toString() !== userId) throw new BadRequestException("bad request")

        task.assignments.filter((el : TaskAssignment) => el.userId.toString() !== userId)

        

        try{
            await Promise.all([
                 task.save() ,
                 this.sharedTaskModel.findOneAndDelete({
                    task: taskObjectId , 
                    sharedWithUser : generateObjectId(taskAssignmentDto.assignedUserId)
                })
            ])
             
        }catch(e) {
            Logger.error("error while unAssigning the task")
            throw new InternalServerErrorException("server error while unAssigning the task")
        }

      }
   
   
   
     async assignTask(taskAssignmentDto: TaskAssignmentDto , userId : string): Promise<any> {

        const assignedUserObjectId = generateObjectId(taskAssignmentDto.assignedUserId)
        const taskObjectId = generateObjectId(taskAssignmentDto.taskId)

        const [assignedUser , task] = await Promise.all([
                this.userModel.findById(assignedUserObjectId) ,
                this.taskModel.findById(taskObjectId)
            ])
   
        if(assignedUser == null ) throw new NotFoundException("assigned user does not found")
        if(task == null ) throw new NotFoundException("task does not found")
        if(task.createdUser.toString() !== userId) throw new BadRequestException("bad request")
        const isUserTaskAssigned = task.assignments.find((el : TaskAssignment) => el.userId.toString() == taskAssignmentDto.assignedUserId)
        if(isUserTaskAssigned) throw new ConflictException("user is already assigned the task")

        task.assignments = [{
            userId : assignedUser._id ,
            assignedAt : new Date()
        } , ...task.assignments]

        const newSharedTask = new this.sharedTaskModel({
            task : taskObjectId ,
            sharedByUser : generateObjectId(userId) ,
            sharedWithUser : assignedUserObjectId
        })

        try{
            await Promise.all([
                task.save(),
                newSharedTask.save()
            ])
        }catch(e) {
            Logger.error(e)
            throw new InternalServerErrorException("server error while assigning the task")
        }
    }
    
    
      async addTask(createTaskDto: CreateTaskDto , userId : string): Promise<Task | null> {
                    const userObjectId = generateObjectId(userId)
    
                    const user = await this.userModel.findById(userObjectId)
                    if(user == null) throw new NotFoundException("user does not exists")
                        
                    const newTask = new this.taskModel({...createTaskDto, createdUser : userObjectId }); 
                 
                   try{
                     var savedTask =  await newTask.save()
                    }catch(e){
                        Logger.error(e)
                        throw new InternalServerErrorException("cannot add new task")
                    }
                    
                    try{
                        if(!this.isCategoryUsedBeforeByUser(createTaskDto.category , user)){
                                user.userTasksCategories.push(createTaskDto.category)
                        }
                        user.tasks.push(savedTask)
                        await user.save()
                        
                        return savedTask
                    }catch(e){
                        Logger.error(e , "error while creating task")
                        throw new InternalServerErrorException("error while creating task")
                    }
        }
            private isCategoryUsedBeforeByUser(categoryName : string , user : User) : boolean{
                return user.userTasksCategories.includes(categoryName)
            }
}
