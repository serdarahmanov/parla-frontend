import React from 'react'
import { ContactForm } from '../components/ContactForm'

function Contact() {
  return (
    <div className='py-20 grid grid-cols-12 bg-white'>

      <div className=' col-span-7 col-start-4'><ContactForm/></div>
      
    </div>
  )
}

export default Contact
