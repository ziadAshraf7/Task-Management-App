'use client'

import { User } from '@/app/_types/types'
import { Button, Chip, Tooltip } from '@heroui/react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'

function TaskCard({
    setIsOpen ,
    _id : taskId ,
    title  , 
    description  , 
    category  , 
    dueDate  , 
    completed , 
    assignments ,
    setSelectedTaskId
  } : {
    setIsOpen : Dispatch<SetStateAction<boolean>>
    _id : string
    title : string, 
    description : string, 
    category : string, 
    dueDate : string, 
    completed : boolean, 
    assignments : {user : User}[] ,
    setSelectedTaskId : Dispatch<SetStateAction<string>>
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
    
    <Tooltip content = "assign user">
    <Chip 
    onClick={() => {
      setIsOpen(true)
      setSelectedTaskId(taskId)
      }} 
      className='cursor-pointer'
      color='success'>
        <Image src={"/assets/add.png"} alt='' width={20} height={20} />
      </Chip>
      </Tooltip>

  </div>
  )
}

export default TaskCard
