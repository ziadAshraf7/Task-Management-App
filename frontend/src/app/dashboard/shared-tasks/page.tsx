'use client'

import { useGetSharedTasksQuery } from '@/app/_redux/apiSlice'
import { Input, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import { eventHandler, Task } from '@/app/_types/types'
import TaskCard from './_compoenets/taskCard'
import { logOut } from '@/app/auth/_utills/utills'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

function SharedTasks() {
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()
    const query = {
        category : category, 
        title : title
    }
  const {data : sharedTasks , isLoading : sharedTasksLoading , isFetching} = useGetSharedTasksQuery(query)
       
  // @ts-ignore
       if(sharedTasks?.status  == 401) {
        logOut(dispatch)
        router.replace("/")
      }

    if(sharedTasksLoading) return <Spinner></Spinner>
  
    if ((!sharedTasks || sharedTasks.length === 0) && !(category || title)) {
      return (
        <div className="text-center text-xl text-gray-700 py-10">
          <p>No tasks Shared with you yet .</p>
        </div>
      );
    }
  return (
    <section id="user-created-tasks" className="p-5 rounded-lg shadow-lg">
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
    <div className="text-center mb-5">
      {isFetching && <Spinner className="mx-auto" />}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sharedTasks?.map((task : Task) => {
        return <TaskCard key={task._id} {...task} />;
      })}
    </div>
  </section>
  )
}

export default SharedTasks
