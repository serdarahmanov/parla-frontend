import Link from 'next/link'
import React from 'react'
import HoverSwapLink from '../animations/HoverSwapLink'


const footerPolicies=[
    {label: "Cookie Policy", href: "/cookie"},
    {label: "Data Protection Notice", href: "/gdpr"}
]


function Footer() {
  return (
    <div className="m-0 fixed bottom-6 left-0 w-full z-50 grid grid-cols-4 px-6 
    
    text-[0.6em] font-bold
    lg:text-xs lg:font-medium items-end
    
    ">

      <div className=' col-span-1 '>PARLA® ©2024</div>

      <div className='col-span-1'>
          <HoverSwapLink  href="/cookie" text="Cookie Policy" />
      </div>
      <div className='col-span-1'>
        <HoverSwapLink  href="/gdpr" text="Privacy Policy" />
       </div>

      <div className='col-span-1 flex justify-end'>
         <HoverSwapLink  href="/by-rahmanov" text=" Site by Rahmanov" />
       </div>
      

    </div>
    
  )
}

export default Footer
