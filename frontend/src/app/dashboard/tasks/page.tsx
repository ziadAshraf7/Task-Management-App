'use client'

import { useGetCreatedTasksQuery } from '@/app/_redux/apiSlice'
import React, { ChangeEventHandler, useState } from 'react'
import TaskCard from '../_components/taskCard'
import { Chip, Input, Select, SelectItem, Spinner, useDisclosure } from '@heroui/react'
import { eventHandler, Task } from '@/app/_types/types'
import { logOut } from '@/app/auth/_utills/utills'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import UpdateTaskModal from './_components/updateTaskModal'

function TasksPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [title , setTitle] = useState("")
    const [category , setCategory] = useState("")
    const [completed , setCompleted] = useState<"completed" | "pending"  | string>()
    const dispatch = useDispatch()
    const router = useRouter()
    const [selectedTaskId , setSelectedTaskId] = useState("")

    const query = {
        category : category, 
        title : title , 
        completed : completed  ,
    }

     const {data : createdTasks , isLoading : createdTasksLoading , isFetching} = useGetCreatedTasksQuery(query)


    // @ts-ignore
    if(createdTasks?.status  == 401) {
      logOut(dispatch)
      router.replace("/")
    }
   if(createdTasksLoading) return <Spinner></Spinner>
  
  if ((!createdTasks || createdTasks.length === 0) && !(category || title || completed)) {
    return (
      <div className="text-center text-xl text-gray-700 py-10">
        <p>No tasks created yet.</p>
      </div>
    );
  }
  const handleCompletedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompleted(event.target.value );
  };

  return (
    <section id="user-created-tasks" className="p-5 rounded-lg shadow-lg">
      {isOpen && <UpdateTaskModal selectedTaskId = {selectedTaskId} onOpenChange={onOpenChange} isOpen = {isOpen} />}
      <h2 className="mb-5 text-2xl font-semibold text-gray-800">Created Tasks</h2>
      <div className="flex flex-col w-full md:flex-row gap-4 mb-5">
        <Input
          onChange={(e : eventHandler) => setCategory(e.target.value)}
          name="category"
          type="text"
          placeholder="Search by category"
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <Input
          onChange={(e : eventHandler) => setTitle(e.target.value)}
          type="text"
          placeholder="Search by title"
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col w-full md:flex-row gap-4 mb-5">
      <Select
        value={completed}
        onChange={handleCompletedChange}
        className="max-w-xs"
        label="Filter by completed state"
    >
        <SelectItem textValue="" key="">All</SelectItem>
        <SelectItem textValue="completed" key="completed">completed</SelectItem>
        <SelectItem textValue="pending" key="pending">pending</SelectItem>
    </Select>
      </div>
      <div className="text-center mb-5">
        {isFetching && <Spinner className="mx-auto" />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {createdTasks?.map((task : Task) => {
          return <TaskCard setSelectedTaskId = {setSelectedTaskId} onOpen = {onOpen} key={task._id} {...task} />;
        })}
      </div>
    </section>
  );
}

export default TasksPage
