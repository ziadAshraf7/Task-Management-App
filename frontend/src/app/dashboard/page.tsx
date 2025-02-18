'use client'

import React from 'react'
import { useGetAssignedTasksQuery, useGetCreatedTasksQuery, useGetSharedTasksQuery } from '../_redux/apiSlice'
import CustomCard from './_components/customCard'
import Projects from './_components/projects'
import { logOut } from '../auth/_utills/utills'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
function DashboardMainPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {data : sharedTasks , isLoading : sharedTasksLoading , error : sharedTasksError } = useGetSharedTasksQuery(null)
    const {data : assignedTasks , isLoading : assignedTasksLoading , error : assignedTasksError} = useGetAssignedTasksQuery(undefined)
    const {data : createdTasks , isLoading : createdTasksLoading , error : createdTasksError} = useGetCreatedTasksQuery(undefined)
    
    // @ts-ignore
    if(sharedTasksError?.status  == 401) {
      logOut(dispatch)
      router.replace("/")
    }

  return (
    <section className='w-[300px] md:w-[800px] lg:w-[1000px] overflow-x-auto  p-5'>
        
        {<div className='w-full mx-auto mb-10 flex flex-col  md:flex-row justify-between'>
           <CustomCard title= {"Shared Tasks"} cardBody={sharedTasks?.length} />
           <CustomCard title= {"Assigned Tasks"} cardBody={assignedTasks?.length} />
           <CustomCard title= {"Craeted Tasks"} cardBody={createdTasks?.length} />
        </div>}

        <Projects />
    </section>
  )
}

export default DashboardMainPage
