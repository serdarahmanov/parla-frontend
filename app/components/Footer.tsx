import React from 'react'
import HoverSwapLink from '../animations/HoverSwapLink'

function Footer() {
  return (
    <div className="m-0 fixed bottom-6 left-0 w-full z-50 grid grid-cols-4 px-6 
    
    text-[0.6em] font-bold text-white [mix-blend-mode:difference]
    lg:text-xs lg:font-medium items-end
    max-[480px]:bottom-3 max-[480px]:rounded-full max-[480px]:bg-[rgba(251,251,251,0.9)] max-[480px]:py-2 max-[480px]:text-black max-[480px]:[mix-blend-mode:normal] max-[480px]:[backdrop-filter:blur(2px)]
    
    ">

      <div className=' col-span-1 '>PARLA® ©2024</div>

      <div className='col-span-1'>
          <HoverSwapLink className="text-inherit opacity-80 hover:opacity-100" href="/cookie" text="Cookie Policy" />
      </div>
      <div className='col-span-1'>
        <HoverSwapLink className="text-inherit opacity-80 hover:opacity-100" href="/gdpr" text="Privacy Policy" />
       </div>

      <div className='col-span-1 flex justify-end'>
         <HoverSwapLink className="text-inherit opacity-80 hover:opacity-100" href="/by-rahmanov" text=" Site by Rahmanov" />
       </div>
      

    </div>
    
  )
}

export default Footer
