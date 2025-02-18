
'use client'


import { useUpdateTaskMutation } from "@/app/_redux/apiSlice";
import { eventHandler } from "@/app/_types/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
  } from "@heroui/react";
import { message } from "antd";
import { useState } from "react";
  
  export default function UpdateTaskModal({
    isOpen , 
    onOpenChange ,
    selectedTaskId
  } : {
    isOpen : boolean ,
    onOpenChange : any ,
    selectedTaskId : string
  }) {
    const [newTitle , setNewTitle] = useState("")
    const [newDescription , setNewDescription] = useState("")
    const [updateTask , {isLoading}] = useUpdateTaskMutation()

     async function handleUpdate(){
        console.log(selectedTaskId)
        if(!selectedTaskId) return
       
        const response : any = await updateTask({
            taskId : selectedTaskId ,
            title : newTitle ? newTitle : null , 
            description : newDescription ? newDescription : null ,
        })
        console.log(response)
        if(response.error){
            message.error(response.error.data.message)
        }else{
            message.success("Updated Successfully")
        }
    }

    return (
      <>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
   <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Update Task</ModalHeader>
        <ModalBody>
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input
                  type="text"
                  value = {newTitle}
                  onChange={(e : eventHandler) => setNewTitle(e.target.value)}
                  id="title"
                  size="sm"
                  name="title"
                  placeholder="Enter new title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={newDescription}
                  onChange={(e : eventHandler) => setNewDescription(e.target.value)}
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Enter new description"
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button isLoading = {isLoading} color="primary" type="submit" onPress={async () => {
            await handleUpdate()
            // onClose()
          }}>
            Update
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
      </>
    );
  }
  