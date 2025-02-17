'use client'

import { useGetCreatedTasksQuery } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'
import AssignUserModal from '../_components/assignUserModal'
import TaskCard from './_component/taskCard'
import { eventHandler, Task } from '@/app/_types/types'
import { Input, Spinner } from '@heroui/react'

function AssignTask() {
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const query = {
    title : title , 
    category : category
  }
  const {data , isLoading , isFetching} = useGetCreatedTasksQuery(query)
  const [isOpen,setIsOpen] = useState(false);
  const [selectedTaskId , setSelectedTaskId] = useState("")
 

  if(isLoading) return <Spinner></Spinner>
  
  if ((!data || data.length === 0) && !(category || title)) {
    return (
      <div className="text-center text-xl text-gray-700 py-10">
        <p>No tasks Created yet .</p>
      </div>
    );
  }
  return (
    <section id="user-created-tasks" className="p-5 rounded-lg shadow-lg">
      {isOpen && <AssignUserModal  isOpen={isOpen} setIsOpen={setIsOpen} selectedTaskId={selectedTaskId} />}
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
    <div className="text-center mb-5">
      {isFetching && <Spinner className="mx-auto" />}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((task : Task) => {
        return <TaskCard setSelectedTaskId={setSelectedTaskId} setIsOpen={setIsOpen} key={task._id} {...task} />;
      })}
    </div>
  </section>
  )
}

export default AssignTask
