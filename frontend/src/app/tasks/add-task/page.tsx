'use client'

import React, { FormEvent, useState } from 'react'
import {Button  } from "@heroui/button";
import {Input} from "@heroui/input";
import { eventHandler } from '@/app/_types/types';
import { useAddTaskMutation } from '@/app/_redux/apiSlice';

function AddTaskPage() {
  
  const [addTask] = useAddTaskMutation()

  const data = {
    title : "" , 
    description : "" , 
    dueDate : "" , 
    category : ""
  }

  let [taskData , setTaskData] = useState(data)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await addTask(taskData)
    if(!response.error){}
  };


  return (
    <section>
      <div className='w-screen h-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input 
          onChange={(e: eventHandler) => setTaskData({ ...taskData, [e.target.name]: e.target.value })} 
          type='text' 
          name="title" 
          required 
          placeholder='title' 
        />          

        <input 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({ ...taskData, [e.target.name]: e.target.value })} 
          type='text' 
          name="description" 
          required 
          placeholder='description' 
        />

      <input 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({ ...taskData, [e.target.name]: e.target.value })} 
        type='date' 
        name="dueDate" 
        required 
        placeholder='dueDate' 
      />

      <input 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({ ...taskData, [e.target.name]: e.target.value })} 
        type='text' 
        name="category" 
        required 
        placeholder='category' 
      />

          <Button type='submit'>submit</Button>
        </form>
      </div>
    </section>
  )
}

export default AddTaskPage
