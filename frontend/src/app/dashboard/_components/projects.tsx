
'use client'

import { useGetAssignedTasksQuery, useGetSharedTasksQuery } from '@/app/_redux/apiSlice'
import { Task, userCookieData } from '@/app/_types/types';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Chip, Spinner } from '@heroui/react'
import React from 'react'
import { useSelector } from 'react-redux';

const columns = [
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "createdBy",
      label: "createdBy",
    },
    {
      key: "dueDate",
      label: "dueDate",
    },
    {
        key : "created at" ,
        label : "created at"
    }
  ];

function Projects() {
  const userData = useSelector((state : {user : {user : userCookieData | undefined}}) => state.user);
  let {data : sharedTasks , isLoading : sharedTasksLoading} = useGetSharedTasksQuery(null)
  let {data : assignedTasks , isLoading : assignedTasksLoading} = useGetAssignedTasksQuery(undefined)

 const tasks =  []
  
 if(sharedTasks?.length > 0) tasks.push(...sharedTasks)
 if(assignedTasks?.length > 0) tasks.push(...assignedTasks)


 if (tasks) {
  tasks.sort(() => Math.random() - 0.5);
}

  if(sharedTasksLoading || assignedTasksLoading) return <Spinner className='text-center'></Spinner>
  if(tasks.length == 0) return (<>
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-semibold text-gray-700">
        You don't have any projects to work on right now.
      </h2>
      <p className="text-lg text-gray-500 mt-2">
        It seems you are not yet included in any projects .
      </p>
    </div>
    </>)
  return (
    <section id='projects'>
      <h2 className='text-2xl mb-5 font-semibold text-neutral-800'>Projects</h2>
      <Table className='w-full' aria-label="Task details table">
        <TableHeader>
          <TableColumn>TASK TITLE</TableColumn>
          <TableColumn>CREATED BY</TableColumn>
          <TableColumn>SHARED WITH</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>DUEDATE</TableColumn>
        </TableHeader>
        <TableBody>
              {tasks?.slice(0,8).map((task : Task) => {
                return <TableRow key={task._id}>
                <TableCell>{ task.title}</TableCell>
                <TableCell>
                  {(userData?.user?.user.id == task?.createdUser?._id ) ?  <Chip color='success' variant='shadow'>{"me"}</Chip>  : task?.createdUser?.name}
                  </TableCell>
                
                <TableCell>
                  {task.assignments.length}
                </TableCell>
               
                <TableCell>
                  {task.completed ? <Chip color='success' variant='shadow'>Completed</Chip> : <Chip color='warning'>In Progress</Chip>}
                </TableCell>
                
                <TableCell>
                  {task.dueDate}
                </TableCell>
                </TableRow>
              })}
        </TableBody>
    </Table>
    </section>
  )
}

export default Projects
