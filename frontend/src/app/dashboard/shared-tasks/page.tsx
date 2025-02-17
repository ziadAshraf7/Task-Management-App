'use client'

import { useGetSharedTasksQuery } from '@/app/_redux/apiSlice'
import { Input, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import TaskCard from '../_components/taskCard'

function SharedTasks() {
  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")

    const query = {
        category : category, 
        title : title
    }
  const {data : sharedTasks , isLoading : sharedTasksLoading , isFetching} = useGetSharedTasksQuery(query)
    
  return (
    <section id='user-created-tasks' className='p-5'>
    <h2 className='mb-5'>Shared Tasks</h2>
    <div className='p-2 flex gap-4'>
        <Input onChange={(e : any) => setCategory(e.target.value)} name = 'category' type = "text"  placeholder='search by category'/>
        <Input onChange={((e : any) => setTitle(e.target.value))} type = "text"  placeholder='search by title'/>
    </div>
    {<div className='text-center'>
        {isFetching && <Spinner className='mx-auto' />}

        </div>}
    <div className='grid grid-cols-4 gap-4 items-center'>
        {sharedTasks?.map((task : any) => {
            return <TaskCard  {...task} />
        })}
    </div>
  
</section>
  )
}

export default SharedTasks
