
import React from 'react'
import ProtectedPage from '../_components/protectedPage'
import NavBar from './_components/navBar'
import Header from '../_components/header'

function DashboardLayout({
    children
}:{
    children : React.ReactNode
}) {
  return (
    <ProtectedPage >
     <section className='flex' id='dashboard'>
        <NavBar />
        <div className='w-full'>
        <Header/>
         {children}
        </div>
     </section>
    </ProtectedPage>
  )
}

export default DashboardLayout
