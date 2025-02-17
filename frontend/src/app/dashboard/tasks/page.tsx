'use client'

import { useGetCreatedTasksQuery } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'
import TaskCard from '../_components/taskCard'
import { Chip, Input, Spinner } from '@heroui/react'

function TasksPage() {

    const [title , setTitle] = useState("")
    const [category , setCategory] = useState("")


    const query = {
        category : category, 
        title : title
    }

     const {data : createdTasks , isLoading : createdTasksLoading , isFetching} = useGetCreatedTasksQuery(query)


     console.log(createdTasks , "tasks")

  if(createdTasksLoading) return <div>Loading...</div>
 if(!createdTasks) return <div> No tasks created yet </div>

  return (
    <section id='user-created-tasks' className='p-5'>
        <h2 className='mb-5'>Created Tasks</h2>
        <div className='p-2 flex gap-4'>
            <Input onChange={(e : any) => setCategory(e.target.value)} name = 'category' type = "text"  placeholder='search by category'/>
            <Input onChange={((e : any) => setTitle(e.target.value))} type = "text"  placeholder='search by title'/>
        </div>
        {<div className='text-center'>
            {isFetching && <Spinner className='mx-auto' />}

            </div>}
        <div className='grid grid-cols-4 gap-4 items-center'>
            {createdTasks?.map((task : any) => {
                return <TaskCard  {...task} />
            })}
        </div>
      
    </section>
  )
}

export default TasksPage
