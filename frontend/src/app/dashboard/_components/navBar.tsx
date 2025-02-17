'use client'


import Link from 'next/link'
import React from 'react'

const mainPath = "/dashboard"

const navItems = [
    {path : mainPath , title : "Dashboard"} ,
    {path : mainPath + "/tasks" , title : "Tasks"} ,
    {path : mainPath + "/shared-tasks" , title : "Shared Tasks"},
    {path : mainPath + "/assigned-tasks" , title : "Assigned Tasks"}

]

function NavBar() {
  return (
    <section id='dashboard-nav'>
      <div className='sticky h-screen bg-slate-300 p-5 w-[200px]'>
       
        <div className='flex flex-col'>
            {navItems.map((nav : {path : string , title : string} , index : number)  => {
                return  <Link key={nav.path} href={nav.path}>{nav.title}</Link>
            })}
        </div>
      
      </div>
    </section>
  )
}

export default NavBar
