'use client'

import React, { FormEvent, useState } from 'react'
import {Button  } from "@heroui/button";
import {Input} from "@heroui/input";
import { eventHandler } from '@/app/_types/types';
import { useAddTaskMutation } from '@/app/_redux/apiSlice';
import { message } from 'antd';

function AddTaskPage() {
  
  const [addTask , {isLoading}] = useAddTaskMutation()

  const data = {
    title : "" , 
    description : "" , 
    dueDate : "" , 
    category : ""
  }

  let [taskData , setTaskData] = useState(data)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response : any = await addTask(taskData)
    if(response.error){
      message.error(response.error?.data?.message)
    }else{
      message.success("Task Added Successfully")
    }
  };


  return (
    <section className="bg-gray-50 py-12">
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            type="text"
            size='sm'
            name="title"
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            required
            placeholder="Enter task title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Input
            id="description"
            type="text"
            size='sm'
            name="description"
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            required
            placeholder="Enter task description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        {/* Due Date Input */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <Input
            id="dueDate"
            type="date"
            size='sm'
            name="dueDate"
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <Input
            id="category"
            size='sm'
            type="text"
            name="category"
            onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
            required
            placeholder="Enter task category"
            className="mt-1 block w-full  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            isLoading = {isLoading}
            color='primary'
            className="w-full px-4 py-2"
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  </section>
  )
}

export default AddTaskPage
