"use client";
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import SplitText from 'gsap/SplitText'
import gsap from 'gsap'
import { EASE_BRAND } from '@/lib/gsap/customEase'
import { usePageEntry } from '@/components/PageEntryProvider'


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type Props ={
    text: string,
    as?: "p" | "span",
    className?: string,
    isLines?: boolean,
    delay?: number
    stagger?:number
    duration?: number
    revealImmediately?: boolean
       
}



const Paragraph = ( {text, as: TextElement = "p", className, isLines=false, delay=1, stagger=0.05, duration=1, revealImmediately = false}: Props) => {

    const paragraphRef = useRef<HTMLParagraphElement | HTMLSpanElement | null>(null);
    const outerRef =useRef<HTMLDivElement | null> (null);
    const { entry } = usePageEntry();
    const entryId = entry?.id ?? null;

  useGSAP(() => {
    if (!entryId) return;

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
        const lineAnimationConfig = {
          autoAlpha: 0,
          yPercent: 10,
          xPercent: 5,
          rotation: -0.5,
          duration,
          ease: EASE_BRAND,
          stagger,
          delay,
        };

        gsap.from(split.lines, revealImmediately
          ? lineAnimationConfig
          : {
              ...lineAnimationConfig,
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 80%",
              },
            },
        );
      } else {
        const charAnimationConfig = {
          autoAlpha: 0,
          yPercent: 25,
          duration,
          ease: EASE_BRAND,
          stagger,
          delay,
        };

        gsap.from(split.chars, revealImmediately
          ? charAnimationConfig
          : {
              ...charAnimationConfig,
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 80%",
              },
            },
        );
      }
    };

    init();

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, [entryId, text, isLines, delay, stagger, duration, revealImmediately]);


    return (

      <TextElement
        ref={(node) => {
          paragraphRef.current = node;
        }}
        className={className}
        style={{ opacity: entryId ? undefined : 0 }}
      >
        {text}
      </TextElement>

    
  )
}


export default Paragraph
