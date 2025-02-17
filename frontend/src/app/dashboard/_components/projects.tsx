
'use client'

import { useGetAssignedTasksQuery, useGetSharedTasksQuery } from '@/app/_redux/apiSlice'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Chip } from '@heroui/react'
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
  const userData = useSelector((state : any) => state.user);
  let {data : sharedTasks , isLoading : sharedTasksLoading} = useGetSharedTasksQuery(null)
  let {data : assignedTasks , isLoading : assignedTasksLoading} = useGetAssignedTasksQuery(null)

 const tasks =  []
  
 if(sharedTasks?.length > 0) tasks.push(...sharedTasks)
 if(assignedTasks?.length > 0) tasks.push(...assignedTasks)


 if (tasks) {
  tasks.sort(() => Math.random() - 0.5);
}
  console.log(sharedTasks , "shared tasks")

  if(sharedTasksLoading || assignedTasksLoading) return "loading"
  return (
    <section id='projects'>
      <h2>Projects</h2>
      <Table aria-label="Task details table">
        <TableHeader>
          <TableColumn>TASK TITLE</TableColumn>
          <TableColumn>CREATED BY</TableColumn>
          <TableColumn>SHARED WITH</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>DUEDATE</TableColumn>
        </TableHeader>
        <TableBody>
              {tasks?.slice(0,8).map((task : any) => {
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
