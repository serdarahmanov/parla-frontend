import Link from 'next/link'
import React from 'react'


const footerPolicies=[
    {label: "Cookie Policy", href: "/cookie"},
    {label: "Data Protection Notice", href: "/gdpr"}
]


function Footer() {
  return (
    <div className="m-0 fixed bottom-6 left-0 w-full z-50 grid grid-cols-4 px-6 text-xs font-medium items-end
    
    ">

      <div className=' col-span-1'>PARLA® ©2024</div>

      <div className='col-span-1'>
            <Link  href="/cookie" >Cookie Policy</Link>
      </div>
      <div className='col-span-1'>
            <Link href="/gdpr">Data Protection Notice</Link>
      </div>

      <div className='col-span-1 flex justify-end'>Site by Rahmanov</div>

    </div>
  )
}

export default Footer
