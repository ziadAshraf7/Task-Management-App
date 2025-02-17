'use client'

import { useGetCreatedTasksQuery } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'
import AssignUserModal from '../_components/assignUserModal'
import TaskCard from './_component/taskCard'

function AssignTask() {
  const {data , isLoading} = useGetCreatedTasksQuery(undefined)
  const [isOpen,setIsOpen] = useState(false);
  const [selectedTaskId , setSelectedTaskId] = useState("")

  return (
    <section>
      {isOpen && <AssignUserModal 
        selectedTaskId = {selectedTaskId} 
        isOpen = {isOpen}  
        setIsOpen = {setIsOpen} 
      />}
      <div className='grid grid-cols-4 items-center'>
        {data?.map((task : any) => {
          console.log(task)
          return <TaskCard setSelectedTaskId = {setSelectedTaskId} setIsOpen = {setIsOpen}  {...task} />
             
        })}
      </div>
    </section>
  )
}

export default AssignTask
