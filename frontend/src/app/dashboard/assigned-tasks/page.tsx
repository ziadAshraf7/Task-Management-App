'use client'


import { useGetAssignedTasksQuery } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'
import { Input, Spinner } from '@heroui/react'
import TaskCard from './_components/taskCard'
import UnAssignUserModal from './_components/unAssignUserModal'
import { eventHandler, Task, User } from '@/app/_types/types'
import { logOut } from '@/app/auth/_utills/utills'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

function AssignedTasks() {
  
  
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const [isOpen,setIsOpen] = useState(false);
  const [taskUsersAssigend , setTaskUsersAssigned] = useState<{user : User}[]>([])
  const [selectedTaskId , setSelectedTaskId] = useState<string>("")
  const router = useRouter()
  const dispatch = useDispatch()
   const query = {
        category : category, 
        title : title
    }
    const {data : assignedTasks , isLoading : assignedTasksLoading , isFetching} = useGetAssignedTasksQuery(query)
  
    // @ts-ignore
       if(assignedTasks?.status  == 401) {
        logOut(dispatch)
        router.replace("/")
      }

    if (assignedTasksLoading) return <Spinner></Spinner>;
    if ((!assignedTasks || assignedTasks.length === 0) && !(category || title)) {
      return (
        <div className="text-center text-xl text-gray-700 py-10">
          <p>never assigend tasks yet</p>
        </div>
      );
    }
    
    return (
      <section id="user-assigned-tasks" className="p-5 rounded-lg shadow-lg">
        <UnAssignUserModal
          selectedTaskId={selectedTaskId}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          assignedUsers={taskUsersAssigend}
        />
    
        <h2 className="mb-5 text-2xl font-semibold text-gray-800">Assigned Tasks</h2>
        <div className="flex flex-col w-full md:flex-row gap-4 mb-5">
          <Input
            onChange={(e: eventHandler) => setCategory(e.target.value)}
            name="category"
            type="text"
            placeholder="Search by category"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <Input
            onChange={(e: eventHandler) => setTitle(e.target.value)}
            type="text"
            placeholder="Search by title"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="text-center mb-5">
          {isFetching && <Spinner className="mx-auto" />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assignedTasks?.map((task: Task) => {
            return (
              <TaskCard
                key={task._id}
                setSelectedTaskId={setSelectedTaskId}
                setIsOpen={setIsOpen}
                setTaskUsersAssigned={setTaskUsersAssigned}
                {...task}
              />
            );
          })}
        </div>
      </section>
    )
}

export default AssignedTasks
