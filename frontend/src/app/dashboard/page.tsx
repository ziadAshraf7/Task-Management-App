'use client'

import React from 'react'
import { useGetAssignedTasksQuery, useGetCreatedTasksQuery, useGetSharedTasksQuery } from '../_redux/apiSlice'
import { CardBody } from '@heroui/react'
import CustomCard from './_components/customCard'
import Projects from './_components/projects'
import Header from '../_components/header'
import { logOut } from '../auth/_utills/utills'

function DashboardMainPage() {

    const {data : sharedTasks , isLoading : sharedTasksLoading} = useGetSharedTasksQuery(null)
    const {data : assignedTasks , isLoading : assignedTasksLoading} = useGetAssignedTasksQuery(null)
    const {data : createdTasks , isLoading : createdTasksLoading} = useGetCreatedTasksQuery(undefined)

  return (
    <section>
        {<div className='w-full mb-5 flex justify-between'>
           <CustomCard title= {"Shared Tasks"} cardBody={sharedTasks?.length} />
           <CustomCard title= {"Assigned Tasks"} cardBody={assignedTasks?.length} />
           <CustomCard title= {"Craeted Tasks"} cardBody={createdTasks?.length} />
        </div>}

        <Projects />
    </section>
  )
}

export default DashboardMainPage
