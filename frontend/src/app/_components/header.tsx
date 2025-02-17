
'use client'

import React from 'react'
import { logOut } from '../auth/_utills/utills'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { userCookieData } from '../_types/types'
import { usePathname } from 'next/navigation';
import { Navbar, NavbarContent, NavbarMenuToggle, 
  NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem , Link, Button } from '@heroui/react'



function Header() {
  const router = useRouter();
  const dispatch = useDispatch()
  const userData = useSelector((state : {user : {user : userCookieData | null}}) => state.user )
  const path = usePathname()
  const isAuthenticated = userData && userData?.user?.user.id;
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {key : "Home" , value : "/" , activeKey : "N/A"},
    {key : "Dashboard" , value : "/dashboard" , activeKey : "dashboard"},
    {key : "Add Task" , value : "/tasks/add-task" , activeKey : "add-task"},
    {key : "Assign Task" , value : "/tasks/assign-task" , activeKey : "assign-task"}
  ]

  return (
  //   <header id='header' className='sticky top-0 z-20 bg-white shadow-sm'>
  //   <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
  //     {/* Logo */}
  //     <h2 className='text-2xl font-bold text-blue-600 cursor-pointer' onClick={() => router.push('/')}>
  //       Taskify
  //     </h2>

  //     {/* Navigation Links */}
  //     <nav className='flex gap-6 items-center'>
  //       <Link href='/' className={`text-sm font-medium hover:text-blue-600 transition-colors ${path === '/' ? 'text-blue-600' : 'text-gray-700'}`}>
  //         Home
  //       </Link>
  //       <Link href='/dashboard' className={`text-sm font-medium hover:text-blue-600 transition-colors ${path === '/dashboard' ? 'text-blue-600' : 'text-gray-700'}`}>
  //         Dashboard
  //       </Link>
  //       <Link href='/tasks/add-task' className={`text-sm font-medium hover:text-blue-600 transition-colors ${path === '/tasks/add-task' ? 'text-blue-600' : 'text-gray-700'}`}>
  //         Add Task
  //       </Link>
  //       <Link href='/tasks/assign-task' className={`text-sm font-medium hover:text-blue-600 transition-colors ${path === '/tasks/assign-task' ? 'text-blue-600' : 'text-gray-700'}`}>
  //         Assign Task
  //       </Link>
  //     </nav>

  //     {/* Auth Buttons */}
  //     <div className='flex gap-4 items-center'>
  //       {(
  //         <button
  //           onClick={() => {
  //             logOut(dispatch);
  //             router.replace('/');
  //           }}
  //           className='bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors'
  //         >
  //           Log Out
  //         </button>
  //       ) }
  //     </div>
  //   </div>
  // </header>
  <Navbar onMenuOpenChange={setIsMenuOpen}>
  <NavbarContent>
    <NavbarMenuToggle
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      className="sm:hidden"
    />
    <NavbarBrand>
      <div className='text-blue-500 text-2xl font-semibold'>Taskify</div>
    </NavbarBrand>
  </NavbarContent>

  <NavbarContent className="hidden sm:flex gap-4" justify="center">
    {menuItems.map((nav) => {
      return <NavbarItem 
        isActive = {path.includes(nav.activeKey)}
      >
      <Link color={path.includes(nav.activeKey) ? "primary" : 'foreground'}  href={nav.value}>
        {nav.key}
      </Link>
    </NavbarItem>
    })}
    
  </NavbarContent>
  <NavbarContent justify="end">
    <NavbarItem>
      <Button 
      onPress={() => {
        logOut(dispatch)
        router.replace("/")
      }} as={Link} color="danger"  variant="flat">
        LogOut
      </Button>
    </NavbarItem>
  </NavbarContent>
  <NavbarMenu>
    {menuItems.map((item, index) => (
      <NavbarMenuItem key={`${item}-${index}`}>
        <Link
          className="w-full"
          color={
            index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
          }
          href={item.value}
        >
          {item.key}
        </Link>
      </NavbarMenuItem>
    ))}
  </NavbarMenu>
</Navbar>
  );
}


export default Header
