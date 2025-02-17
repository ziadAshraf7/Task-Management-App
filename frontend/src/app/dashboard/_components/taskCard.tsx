'use client'

import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/app/_redux/apiSlice";
import { userCookieData } from "@/app/_types/types";
import { faMarker, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@heroui/react";
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
    const userState = useSelector((state : {user : {user : userCookieData}}) => state.user);
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
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{category}</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            completed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          } transition-colors duration-200`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <h2 className="font-bold text-2xl mb-3 text-gray-800">{title}</h2>
      <div className="mb-4 h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="font-semibold">Due Date:</span>
        <span className="ml-2 text-gray-700">{new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <span className="font-semibold">Shared With:</span>
        <span className="ml-2 text-gray-700">{assignments.length} people</span>
      </div>
    </div>
    {userState?.user?.user?.id === createdUser._id && (
      <div className="flex mt-4 px-6 py-3 bg-gray-50 border-t border-gray-100">
        <Tooltip content = "mark as completed">
          <button
            onClick={handleTaskComplete}
            className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition duration-300 hover:scale-105"
          > 
            <FontAwesomeIcon icon={faMarker} />
          </button>
        </Tooltip>
    
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition duration-300 hover:scale-105 ml-3"
        >     
          <FontAwesomeIcon icon={faTrash} />       
      </button>  
      </div>
    )}
  </div>
  );
};

export default TaskCard;