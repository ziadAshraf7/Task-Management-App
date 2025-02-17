import {  useUnAssignTaskMutation } from "@/app/_redux/apiSlice"
import { User } from "@/app/_types/types"
import { Button, Spinner } from "@heroui/react"
import { message } from "antd"
import { useEffect, useState } from "react"



function UnAssignUserModal({
    isOpen, 
    setIsOpen ,
    assignedUsers ,
    selectedTaskId
}:{
    isOpen : boolean, 
    setIsOpen : any ,
    assignedUsers: any ,
    selectedTaskId : string
}) {

    const [userNameSearch , setUserNameSearch] = useState("")
    const [selectedUser , setSelectedUser] = useState<{user : User} | null>(null)
    const [unAssignTask , {isLoading}] = useUnAssignTaskMutation()
   
    async function handleUnAssigningTask(){
        if(!selectedUser || !selectedTaskId) return
        console.log(selectedTaskId ,selectedUser.user._id )
        const response : any = await unAssignTask({
            assignedUserId: selectedUser.user._id,
            taskId : selectedTaskId
        })
        if(response.error){
            message.error(response.error.data.message)
        }else{
            message.success("un assigned")
            setIsOpen(false)
        }
    }

 
    if(userNameSearch){
      assignedUsers = assignedUsers.filter((user : {user : User}) => user.user.name.toLowerCase().includes(userNameSearch.toLowerCase()))
    }

 if(!isOpen) return null
  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
    <div className='bg-white rounded-lg shadow-lg w-[80%] h-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative'>
      {/* Close Button */}
      <div className='flex justify-end'>
        <button
          onClick={() => setIsOpen(false)}
          className=' p-3 text-gray-600 hover:text-gray-900 text-xl font-bold'
        >
          X
        </button>
      </div>
     
  
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
        {assignedUsers?.map((el: {id : string , user : User}) => {
            return (
              <div
                key={el.id}
                onClick={() => setSelectedUser(el)}
                className={`${selectedUser?.user.email == el?.user?.email ? "bg-gray-200" : ""} p-2 hover:bg-gray-100 cursor-pointer rounded-lg`}
              >
                <div>{el.user.name}</div>
                <div className='text-xs'>{el.user.email}</div>
              </div>
            );
        })}
      </div>
  
      {/* Submit Button */}
      <div className='p-4 border-t'>
        <Button
          isLoading = {isLoading}
          color="primary"
          onPress={handleUnAssigningTask}
          className='w-full  text-white  '
        >
          Submit
        </Button>
      </div>
    </div>
  </section>
  )
}

export default UnAssignUserModal
