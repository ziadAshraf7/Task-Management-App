import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskManagementService } from './task-managemnr.interface';
import { Task } from 'src/task/task.schema';
import CreateTaskDto from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { generateObjectId } from 'src/utills/utills';
import { TaskAssignmentDto } from 'src/task/dto/taskAssignment.dto';
import { TaskAssignment } from 'src/task/dto/taskAssignment';
import { SharedTask } from 'src/shared-task/shared-task.schema';
import UpdatedTaskDto from 'src/task/dto/updateTask.dto';

export const TASK_MANAGEMENT_SERVICE_TOKEN = "TaskManagementServiceImp"

@Injectable()
export class TaskManagementServiceImp implements TaskManagementService {

      
      constructor(@InjectModel(Task.name) private readonly taskModel : Model<Task> ,
                  @InjectModel(User.name) private readonly userModel : Model<User> ,
                  @InjectModel(SharedTask.name) private readonly sharedTaskModel : Model<SharedTask>
                      ) {}
    
    
    finedSharedTasks(userId: string): Promise<Task[] | null> {
        throw new Error('Method not implemented.');
    }

    async updateTask( updatedTaskDto: UpdatedTaskDto, craetedUserId : string): Promise<Task | null> {
       
        const userObjectId = generateObjectId(craetedUserId)
        const taskObjectId : Types.ObjectId = generateObjectId(updatedTaskDto.taskId)
        
        if(updatedTaskDto.completed != null && !updatedTaskDto.completed ) {
            throw new BadRequestException("you cannot undo the completed status of the task")
        }
        
        const task = await this.taskModel.findOne({createdUser : userObjectId , _id : taskObjectId})
        if(task == null) throw new NotFoundException("task is not found")
        
        if(updatedTaskDto.category){
            const newCategory = updatedTaskDto.category
            const user = await this.userModel.findById(userObjectId)

            if(user && !user?.userTasksCategories.includes(newCategory)){
                user.userTasksCategories.push(newCategory)
                try{
                    await user.save()
                }catch(e){
                    Logger.error(e)
                    throw new InternalServerErrorException("error while updating user tasks categories")
                }
            }
        }


        try{
            return await this.taskModel.findByIdAndUpdate(taskObjectId , updatedTaskDto , {new : true})
        }catch(e) {
            Logger.error(e)
            throw new NotFoundException("user does not exists")
        }  
    }
   

    async unAssignTask(taskAssignmentDto: TaskAssignmentDto, userId: string): Promise<any> {
        const session = await this.sharedTaskModel.startSession();
        session.startTransaction();

        const taskObjectId = generateObjectId(taskAssignmentDto.taskId)

        const task = await this.taskModel.findById(taskObjectId)
        if(task == null) throw new NotFoundException("task is not found")
       
        if(task.createdUser.toString() !== userId) throw new BadRequestException("bad request")
        console.log(taskAssignmentDto.assignedUserId)
        task.assignments = task.assignments.filter((el: TaskAssignment) => el.userId.toString() !== taskAssignmentDto.assignedUserId);
        console.log(task.assignments , "assigns")
        try{
            await Promise.all([
                 task.save({session}) ,
                 this.sharedTaskModel.findOneAndDelete({
                    task: taskObjectId , 
                    sharedWithUser : generateObjectId(taskAssignmentDto.assignedUserId)
                })
            ])
            await session.commitTransaction();
            session.endSession();
        }catch(e) {
            Logger.error("error while unAssigning the task")
            throw new InternalServerErrorException("server error while unAssigning the task")
        }

      }
   
   
   
     async assignTask(taskAssignmentDto: TaskAssignmentDto , userId : string): Promise<any> {
        const session = await this.sharedTaskModel.startSession();
        session.startTransaction();

        const assignedUserObjectId = generateObjectId(taskAssignmentDto.assignedUserId)
        const taskObjectId = generateObjectId(taskAssignmentDto.taskId)

        const [assignedUser , task] = await Promise.all([
                this.userModel.findById(assignedUserObjectId) ,
                this.taskModel.findById(taskObjectId)
            ])
   
        if(assignedUser == null ) throw new NotFoundException("assigned user does not found")
        if(task == null ) throw new NotFoundException("task does not found")
        if(task.createdUser.toString() !== userId) throw new BadRequestException("bad request")
    
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
                task.save({session}),
                newSharedTask.save()
            ])
            await session.commitTransaction();
            session.endSession();
        }catch(e) {
            Logger.error(e)
            throw new InternalServerErrorException("server error while assigning the task" , e.message)
        }
    }
    
    async deleteTask(id: string , userId : string ): Promise<void> {

        const taskObjectId = generateObjectId(id)
        const task = await this.taskModel.findById(taskObjectId) 
        if(task == null) throw new NotFoundException("task is not found")
        const userTaskId = task.createdUser 
    
        if(userTaskId.toString() !== userId) throw new UnauthorizedException("user is not authorized to delete this task")
        
        const sharedTaskEntity = await this.sharedTaskModel.findOne({task : taskObjectId})
        try{
            if(sharedTaskEntity){
                await Promise.all([
                    task.deleteOne() ,
                    sharedTaskEntity.deleteOne()
                ])
                return
            }
           await task.deleteOne()
        }catch(e){
            Logger.error(e)
            throw new InternalServerErrorException("cannot delete task")
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
