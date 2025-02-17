'use client'

import { useAssignTaskMutation, useSearchUserQuery } from '@/app/_redux/apiSlice'
import { User, userCookieData, userInfo } from '@/app/_types/types'
import { Button, Spinner } from '@heroui/react'
import {  message } from 'antd'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'

function AssignUserModal({
    isOpen, 
    setIsOpen ,
    selectedTaskId
}:{
    isOpen : boolean, 
    setIsOpen : Dispatch<SetStateAction<boolean>> ,
    selectedTaskId : string ,
}) {
    const userData = useSelector((state : {user : {user : userCookieData | undefined}}) => state.user)
    const [userNameSearch , setUserNameSearch] = useState("")
    const [selectedUser , setSelectedUser] = useState<userInfo | null>(null)
    const {data , error, isLoading , isFetching} = useSearchUserQuery(userNameSearch)
    const [assignTask] = useAssignTaskMutation()


   
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
    <section className='p-5 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
    <div className='bg-white rounded-lg shadow-lg w-[80%] h-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative'>
      {/* Close Button */}
      <div className=' p-5 flex justify-end'>
        <button
          onClick={() => setIsOpen(false)}
          className=' text-gray-600 hover:text-gray-900 text-xl font-bold'
        >
          X
        </button>
      </div>
  
  
      {/* Search Input */}
      <div className=' p-4 border-b'>
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
        {data?.map((user: userInfo) => {
          if (user.id !== userData?.user?.user.id) {
            return (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`${selectedUser?.email == user?.email ? "bg-gray-200" : ""} p-2 hover:bg-gray-100 cursor-pointer rounded-lg`}
              >
                <div>{user.name}</div>
                <div className='text-xs'>{user.email}</div>
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
          color='primary'
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
