import React from 'react'
import { SidebarTrigger } from './ui/sidebar';
import Image from "next/image"

const NavBar = () => {
  return (
    <div className='absolute top-0 h-14 w-full border z-10 flex gap-4 bg-primary'>
      <div className="w-[14rem] h-10 ml-6">
      <Image src="/logo.svg" width={200} height={100} alt="Logo Img" />
      </div>
      <SidebarTrigger className='outline outline-1' />
    </div>
  )
}
export default NavBar;