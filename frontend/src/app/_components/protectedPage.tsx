
'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { extractUserData } from '../_utills/utills';

function ProtectedPage({
    children
}:{
    children: React.ReactNode
}) {
    const user = extractUserData()
    const router =  useRouter()

    console.log(user , "protected")

   if(!user || !user.user.id ) router.replace("/")

 
 return (
    <>{children}</>
  )
}

export default ProtectedPage
