'uee client'


import { Button, Chip, Tooltip } from '@heroui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { User } from '@/app/_types/types'
import Image from 'next/image'

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
  setIsOpen : Dispatch<SetStateAction<boolean>>
  _id : string
  title : string, 
  description : string, 
  category : string, 
  dueDate : string, 
  completed : boolean, 
  setSelectedTaskId : Dispatch<SetStateAction<string>> ,
  assignments : {user : User , assignedAt : string}[] ,
  setTaskUsersAssigned : Dispatch<SetStateAction<{user : User}[]>>
}) {
   
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
     <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{category}</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            completed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          } transition-colors duration-200`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <h2 className="font-bold text-2xl mb-3 text-gray-800">{title}</h2>
      <div className="mb-4 h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="font-semibold">Due Date:</span>
        <span className="ml-2 text-gray-700">{new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="mb-2 flex items-center text-sm text-gray-600">
        <span className="font-semibold">Shared With:</span>
        <span className="ml-2 text-gray-700">{assignments.length} people</span>
      </div>
      <Tooltip  content = "remove user">
            <Chip color='danger'
          size='sm'  
          className='cursor-pointer'
          onClick={() => {
            setIsOpen(true)
            setTaskUsersAssigned(assignments)
            setSelectedTaskId(_id)
          }}>
            <Image src={"/assets/remove-user.png"} alt='' width={20} height={20} />
          </Chip>
        </Tooltip>
    </div>    
       
     
  </div>
  )
}

export default TaskCard
