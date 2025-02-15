'use client'

import React from 'react'

function Task({
  title , 
  description , 

} : {
  title : string , 
  description : string
}) {
  

  return (
    <>
      <div>{title} {description}</div>
    </>
  )
}

export default Task
