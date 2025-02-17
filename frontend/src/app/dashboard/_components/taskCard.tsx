'use client'

import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/app/_redux/apiSlice";
import { Chip } from "@heroui/react";
import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const TaskCard = ({
    _id ,
    title  , 
    description  , 
    category  , 
    dueDate  , 
    completed , 
    createdUser ,
    assignments
  } : {
    _id : string
    title : string, 
    description : string, 
    category : string, 
    dueDate : string, 
    completed : boolean, 
    createdUser : any ,
    assignments : any[] ,
}) => {
    const userState = useSelector((state : any) => state.user);
    const [updatTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    async function handleDelete() {
         console.log(_id)
        const response : any = await deleteTask(_id)
        console.log(response , "delete")
        if(response.error){
            message.error(response.error?.data?.message)
        }else{
            message.success("deleted successfully")
        }    
    }


    async function handleTaskComplete() {
        if(completed) return
        const response : any = await updatTask({
            taskId : _id , 
            completed :  true
        })

        if(response.error){
            message.error(response.error?.data?.message)
        }else{
            message.success("marked as completed")
        }
    }

  return (
    <div className="max-w-sm rounded-lg p-2 overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{category}</span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <div className="mb-4">
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
    <div className="px-6 py-4">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="font-semibold">Due Date:</span>
        <span className="ml-2">{new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <span className="font-semibold">Shared With:</span>
        <span className="ml-2">{assignments.length}</span>
      </div>
    </div>
    {userState?.user?.user?.id == createdUser._id && <div className='flex mt-2 justify-between'>
         <Chip onClick={handleTaskComplete} color="success" className="pointer text-xs">mark as completed</Chip>
         <Chip onClick={handleDelete} color="danger" className="pointer text-xs">delete</Chip>
       </div>}
  </div>
  );
};

export default TaskCard;