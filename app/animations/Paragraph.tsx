"use client";
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import SplitText from 'gsap/SplitText'
import gsap from 'gsap'

type Props ={
    text: string,
    isLines?: boolean,
    delay?: number
    stagger?:number
    duration?: number
       
}



const Paragraph = ( {text, isLines=false, delay=1, stagger=0.05, duration=1}: Props) => {

  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(()=>{

    if(!paragraphRef.current){return}

     const split = new SplitText(paragraphRef.current, {
          type: isLines ? "lines" : "chars, words"
         });

     if(isLines){
        gsap.from(split.lines,{
autoAlpha: 0,
  yPercent:10,
  duration:duration,
  ease: "expo.out",
  stagger: stagger,
  delay: delay,
 xPercent: 5,
 rotation: -0.5,
        })      


     }  else {

      gsap.from(split.chars,{
        
        autoAlpha: 0,
        yPercent: 10,
        duration: duration,
        ease: "expo.out",
        stagger: stagger,
        delay: delay
      })
     }  
    },[]) // if we leave the dependency section empty , it runs only once when page load


    return (

   
      <p ref={paragraphRef} className='overflow-hidden'>{text}</p>
    
  )
}


export default Paragraph