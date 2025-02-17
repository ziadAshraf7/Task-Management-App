
import React from 'react'
import ProtectedPage from '../_components/protectedPage'
import SideBar from './_components/sideBar'
import Header from '../_components/header'

function DashboardLayout({
    children
}:{
    children : React.ReactNode
}) {
  return (
    <ProtectedPage >
     <Header/>
     <section className='flex' id='dashboard'>
        <SideBar />
        <div className='flex-1'>
          {children}
        </div>
     </section>
    </ProtectedPage>
  )
}

export default DashboardLayout
