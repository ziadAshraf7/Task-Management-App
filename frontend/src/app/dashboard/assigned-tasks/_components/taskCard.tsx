'uee client'


import { Button } from '@heroui/react'
import React, { useState } from 'react'
import UnAssignUserModal from './unAssignUserModal'
import { useGetCreatedTasksQuery } from '@/app/_redux/apiSlice'

function TaskCard({
  setIsOpen ,
  _id ,
  title  , 
  description  , 
  category  , 
  dueDate  , 
  completed , 
  setSelectedTaskId ,
  assignments ,
  setTaskUsersAssigned
} : {
  setIsOpen : any
  _id : string
  title : string, 
  description : string, 
  category : string, 
  dueDate : string, 
  completed : boolean, 
  setSelectedTaskId : any ,
  assignments : any[] ,
  setTaskUsersAssigned : any
}) {
   
  return (
    <div className="max-w-sm rounded-lg p-2 overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{category}</span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <div className="mb-4">
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
    <div className="px-6 py-4">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="font-semibold">Due Date:</span>
        <span className="ml-2">{new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <span className="font-semibold">Shared With:</span>
        <span className="ml-2">{assignments.length}</span>
      </div>
    </div>
    { <div >
      <Button onPress={() => {
        setIsOpen(true)
        setTaskUsersAssigned(assignments)
        setSelectedTaskId(_id)
      }}>
        un-assign user
      </Button>
       </div>}
  </div>
  )
}

export default TaskCard
