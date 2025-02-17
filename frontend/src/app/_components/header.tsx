
'use client'

import Link from 'next/link'
import React from 'react'
import { logOut } from '../auth/_utills/utills'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { userCookieData } from '../_types/types'
import { usePathname } from 'next/navigation';


const activeStyle = ''

function Header() {
  const router = useRouter();
  const dispatch = useDispatch()
  const userData = useSelector((state : {user : {user : userCookieData | null}}) => state.user )
  const path = usePathname()
  const isAuthenticated = userData && userData?.user?.user.id;


  return (
    <header id='header'>
      <div className='px-2 py-3 flex justify-between'>
        <div></div>
        <nav className='flex gap-4'>
          <Link className={path == "/" ? "text-neutral-500" : ""} href={"/"}>home</Link>
          <Link className={path == "/dashboard" ? "text-neutral-500" : ""} href={"/dashboard"}>dashboard</Link>
          <Link className={path == "/tasks/add-task" ? "text-neutral-500" : ""} href={"/tasks/add-task"}>add-task</Link>
          <Link className={path == "/tasks/assign-task" ? "text-neutral-500" : ""} href={"/tasks/assign-task"}>assign-task</Link>
        </nav>

        {isAuthenticated && (
          <button onClick={() => {
            logOut(dispatch);
            router.replace("/");
          }}>logOut</button>
        )}
        {!isAuthenticated && (
          <div className='flex gap-3'>
            <Link href={"/login"}>login</Link>
            <Link href={"/signup"}>register</Link>
          </div>
        )}
      </div>
    </header>
  );
}


export default Header
