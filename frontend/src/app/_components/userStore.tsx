'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { userCookieData } from '../_types/types';
import { updateUserInfo } from '../_redux/userSlice';
import { logOut } from '../auth/_utills/utills';

function UserStore({
    children ,
    user
} : {
    children : React.ReactNode ,
    user : userCookieData | null
}) {

    

    const dispatch = useDispatch();
    useEffect(() => {
        if(user && user.accessToken && user.user){
            dispatch(updateUserInfo(user))
        }
    },[user])

  return (
    <div>
      {children}
    </div>
  )
}

export default UserStore
