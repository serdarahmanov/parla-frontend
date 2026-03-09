"use client";
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import SplitText from 'gsap/SplitText'
import gsap from 'gsap'


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type Props ={
    text: string,
    isLines?: boolean,
    delay?: number
    stagger?:number
    duration?: number
       
}



const Paragraph = ( {text, isLines=false, delay=1, stagger=0.05, duration=1}: Props) => {

    const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const el = paragraphRef.current;
    if (!el) return;

    let split: SplitText | null = null;
    let cancelled = false;

    const init = async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      if (cancelled || !paragraphRef.current) return;

      split = new SplitText(paragraphRef.current, {
        type: isLines ? "lines" : "chars, words",
      });

      if (isLines) {
        gsap.from(split.lines, {
          autoAlpha: 0,
          yPercent: 10,
          xPercent: 5,
          rotation: -0.5,
          duration,
          ease: "expo.out",
          stagger,
          delay,
        });
      } else {
        gsap.from(split.chars, {
          autoAlpha: 0,
          yPercent: 10,
          duration,
          ease: "expo.out",
          stagger,
          delay,
        });
      }
    };

    init();

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, [text, isLines, delay, stagger, duration]); // if we leave the dependency section empty , it runs only once when page load


    return (

   
      <p ref={paragraphRef} className='overflow-hidden'>{text}</p>
    
  )
}


export default Paragraph