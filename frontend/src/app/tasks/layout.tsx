


import React from 'react'
import Header from '../_components/header'

function Layout({
    children
}:{
    children : React.ReactNode
}) {
  return (
    <>
        <Header/>
        {children}
    </>

  )
}

export default Layout
