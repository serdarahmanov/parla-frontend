import Link from 'next/link'
import React from 'react'


function Header() {
  return (
   
   <header className="fixed top-3 left-0 w-full z-50 m-0 p-0 text-center  ">
      <div className='p-0 m-0 '>
        <Link href="/" className="leading-none  block text-2xl lg:text-3xl font-black  text-[#fdb813]">
          parla
        </Link>
        
      </div>
    </header>
   
  )
}

export default Header
