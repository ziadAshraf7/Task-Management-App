'use client'


import { useGetAssignedTasksQuery } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'
import Modal from '../_components/modal'
import { Input, Spinner } from '@heroui/react'
import TaskCard from './_components/taskCard'
import UnAssignUserModal from './_components/unAssignUserModal'

function AssignedTasks() {
  
  
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const [isOpen,setIsOpen] = useState(false);
  const [taskUsersAssigend , setTaskUsersAssigned] = useState<any>([])
  const [selectedTaskId , setSelectedTaskId] = useState<any>([])

   const query = {
        category : category, 
        title : title
    }
    const {data : assignedTasks , isLoading : assignedTasksLoading , isFetching} = useGetAssignedTasksQuery(query)


  if(assignedTasksLoading) return <div>Loading...</div>
  if(!assignedTasks) return <div> No tasks created yet </div>
  return (
    <section id='user-assigned-tasks' className='p-5'>
      <UnAssignUserModal 
        selectedTaskId= {selectedTaskId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        assignedUsers={taskUsersAssigend} 
       />

    <h2 className='mb-5'>Shared Tasks</h2>
    <div className='p-2 flex gap-4'>
        <Input onChange={(e : any) => setCategory(e.target.value)} name = 'category' type = "text"  placeholder='search by category'/>
        <Input onChange={((e : any) => setTitle(e.target.value))} type = "text"  placeholder='search by title'/>
    </div>
    {<div className='text-center'>
        {isFetching && <Spinner className='mx-auto' />}

        </div>}
    <div className='grid grid-cols-4 gap-4 items-center'>
        {assignedTasks?.map((task : any) => {
            return <TaskCard 
            setSelectedTaskId = {setSelectedTaskId}
            setIsOpen={setIsOpen} 
            setTaskUsersAssigned = {setTaskUsersAssigned}
            assignedComp = {true} 
            {...task} />
        })}
    </div>
  
</section>
  )
}

export default AssignedTasks
