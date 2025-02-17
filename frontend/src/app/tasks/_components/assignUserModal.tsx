'use client'

import { useAssignTaskMutation, useSearchUserQuery } from '@/app/_redux/apiSlice'
import { Button, Spinner } from '@heroui/react'
import {  message } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function AssignUserModal({
    isOpen, 
    setIsOpen ,
    selectedTaskId
}:{
    isOpen : boolean, 
    setIsOpen : any ,
    selectedTaskId : string ,
}) {
    const userData = useSelector((state : any) => state.user)
    const [userNameSearch , setUserNameSearch] = useState("")
    const [selectedUser , setSelectedUser] = useState<any>(null)
    const {data , error, isLoading , isFetching} = useSearchUserQuery(userNameSearch)
    const [assignTask] = useAssignTaskMutation()


    console.log(selectedTaskId , "auth")

   
    async function handleAssigningTask(){
        if(!selectedUser) return
        const response : any = await assignTask({
            assignedUserId: selectedUser.id,
            taskId:selectedTaskId
        })
        if(response.error){
            message.error(response?.error?.data?.message)
        }else{
            message.success("assigned")
            setIsOpen(false)
        }
    }


 if(!isOpen) return null
  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
    <div className='bg-white rounded-lg shadow-lg w-[80%] h-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative'>
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold'
      >
        ×
      </button>
  
      {/* Search Input */}
      <div className='p-4 border-b'>
        <input
          type='text'
          onChange={(e) => setUserNameSearch(e.target.value)}
          value={userNameSearch}
          placeholder='Search users...'
          className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
  
      {/* User List */}
      <div className='p-4 overflow-scroll'>
        {data?.map((el: any) => {
          if (el.id !== userData?.user.user.id) {
            return (
              <div
                key={el.id}
                onClick={() => setSelectedUser(el)}
                className={`${selectedUser?.email == el?.email ? "bg-gray-200" : ""} p-2 hover:bg-gray-100 cursor-pointer rounded-lg`}
              >
                <div>{el.name}</div>
                <div className='text-xs'>{el.email}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
  
      {/* Loading State */}
      {isFetching && (
        <div className='mx-auto'>
             <Spinner></Spinner>
        </div>
      )}
  
      {/* Submit Button */}
      <div className='p-4 border-t'>
        <Button
          isLoading = {isFetching}
          onPress={handleAssigningTask}
          className='w-full  text-white  '
        >
          Submit
        </Button>
      </div>
    </div>
  </section>
  )
}

export default AssignUserModal
