

import React from 'react'
import { redirect, useRouter } from 'next/navigation';
import { extractUserData } from '../_utills/utills';
import { useSelector } from 'react-redux';
import { userCookieData } from '../_types/types';
import { exctractServerSideUserCookie } from '../_utills/serverSideUttils';

function ProtectedPage({
    children
}:{
    children: React.ReactNode
}) {
  
  const userCookie = exctractServerSideUserCookie()

  if(!userCookie?.accessToken && !userCookie?.user?.id)  { 
    redirect("/")
  }

 
 return (
    <>{children}</>
  )
}

export default ProtectedPage
