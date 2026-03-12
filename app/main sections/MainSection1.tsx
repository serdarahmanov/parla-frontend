import React from 'react'
import Paragraph from '../animations/Paragraph'




const MainSection1 = () => {


  return (
    <div>



      <div className='h-[80vh] text-5xl font-meduim  items-center grid grid-cols-6'>
       
        <div  className='col-span-4 col-start-2'>
         <Paragraph delay={0.2} stagger={0.09}
                text={
    <>
      WE HANDLE THE FULL PRODUCTION CYCLE — <br />
      FROM IDEA AND CONCEPT DEVELOPMENT TO FILMING,<br />
      EDITING,<br />
      DESIGN,<br />
      AND FINAL DELIVERY</>
   }
                isLines
              />

              <div className='text-lg justify-items-end'>
              <Paragraph delay={0.2} stagger={0.05}
                text="Designed to engage Built to connect"
                
              />
</div>



              </div>
      </div>


      
    </div>
  )
}

export default MainSection1
