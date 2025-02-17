'use client'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const mainPath = '/dashboard';

const navItems = [
  { path: mainPath, title: 'Dashboard' , img : "/assets/dashboard.png" },
  { path: mainPath + '/tasks', title: 'Tasks' , img : "/assets/to-do-list.png" },
  { path: mainPath + '/shared-tasks', title: 'Shared Tasks' , img : "/assets/share.png" },
  { path: mainPath + '/assigned-tasks', title: 'Assigned Tasks' , img : "/assets/task-delegation.png" },
];

function SideBar() {
  const path = usePathname();

  return (
    <section className='relative' id='dashboard-nav'>
    <div className='sticky h-screen top-[68px] z-10 bg-white shadow-lg p-3 md:p-6 w-[100px] md:w-[250px]'>
      {/* Navigation Links */}
      <div className='flex text-center flex-col gap-3'>
        {navItems.map((nav) => (
          <Link
            key={nav.path}
            href={nav.path}
            className={`px-4 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              path === nav.path
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          > 
          <div className=' flex gap-2'>
             <Image width={20} height={20} src={nav.img} alt={''}  />
            <span className='hidden md:block'> {nav.title}</span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
  
  );
}
export default SideBar
