
import React from 'react'
import ComponentWrapper from '../_components/componentWrapper'
import { apiEndpoints } from '../api/api'
import {  getDefaultHeaders } from '../_utills/utills'
import { exctractServerSideUserCookie } from '../_utills/serverSideUttils';
import Task from './task/page';
import Btn from './_components/btn';

async function TasksPage() {
   
   const userData = exctractServerSideUserCookie()

   const response = await fetch(apiEndpoints.tasks, {
    headers: {
      ...getDefaultHeaders(),
      'Authorization': `Bearer ${userData?.accessToken}`,
    }
  });
  
  const tasks = await response.json();
    console.log(tasks , "tasks")
   
    return (
    <ComponentWrapper serverSideData={tasks} endPointKey='getTasks' >
        <Btn />
        {tasks.map((e : any) => {
          return<Task description= {e.description} title = {e.title} />
        })}
    </ComponentWrapper>
  )
}

export default TasksPage
