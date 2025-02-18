'use client'

import { useGetSharedTasksQuery } from '@/app/_redux/apiSlice'
import { Input, Select, SelectItem, Spinner } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { eventHandler, Task, userCookieData } from '@/app/_types/types'
import TaskCard from './_compoenets/taskCard'
import { logOut } from '@/app/auth/_utills/utills'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

function SharedTasks() {
  const userData = useSelector((state : {user : {user : userCookieData}}) => state.user)
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const [completed , setCompleted] = useState<"completed" | "pending"  | string>()
  const dispatch = useDispatch()
  const router = useRouter()
    
  const query = {
        category : category, 
        title : title ,
        completed : completed  ,
    }

  const {data : sharedTasks , isLoading : sharedTasksLoading , isFetching , refetch} = useGetSharedTasksQuery(query)
       

    useEffect(() => {
      refetch()
    },[userData?.user?.accessToken])

  // @ts-ignore
       if(sharedTasks?.status  == 401) {
        logOut(dispatch)
        router.replace("/")
      }
    const handleCompletedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCompleted(event.target.value );
    };

    if(sharedTasksLoading) return <Spinner></Spinner>
  
    if ((!sharedTasks || sharedTasks.length === 0) && !(category || title || completed)) {
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
