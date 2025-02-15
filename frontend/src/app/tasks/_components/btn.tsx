'use client'

import { useAddTaskMutation } from '@/app/_redux/apiSlice'
import React from 'react'

function Btn() {
    const [addTask] = useAddTaskMutation()
  return (
    <button onClick={() => addTask({
        "title":"taks4",
        "description":"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
        "deadline":"2025-5-6" ,
        "category":"work"
    })}>
      add task
    </button>
  )
}

export default Btn
