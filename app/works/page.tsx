"use client";
import { useRef } from "react";
import gsap from "gsap"
import React from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollCounter from "../components/ScrollCounter";
import SmoothScroll from "../components/SmoothScroll";
gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        id: 1,
        image: "/assets/LH_01344.png",
        title: "Image one",
        text: "Text for the first image",
    },
    {
        id: 2,
        image: "/assets/LH_01344.png",
        title: "Cotki Zatlar",
        text: "Text for the first image",
    },
    {
        id: 3,
        image: "/assets/LH_01344.png",
        title: "Edemen Yakinda",
        text: "Text for the first image",
    },
    {
        id: 4,
        image: "/assets/LH_01344.png",
        title: "Image four",
        text: "Text for the first image",
    },
    {
        id: 5,
        image: "/assets/LH_01344.png",
        title: "Ast Ast a",
        text: "Text for the first image",
    },
]

 const Page = () => {

    const rootRef = useRef <HTMLDivElement | null>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);


    useGSAP(() => {

        const texts = textRefs.current
        gsap.set(texts, { autoAlpha: 0, y: 0});
        gsap.set(texts[0], { autoAlpha: 1, y: 0 })



        const showText = (activeIndex: number) => {


            texts.forEach((text, index) => {
                if (!text) return;

                gsap.to(text, {
                    autoAlpha: index === activeIndex ? 1 : 0,
                    y: index === activeIndex ? 0 : 0,
                    duration: 0.02,
                    
                });
            });
        };

        sections.forEach((_, index) => {
            ScrollTrigger.create({
                trigger: `.image-section-${index}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => showText(index),
                onEnterBack: () => showText(index)

            })



     } )



        ScrollTrigger.refresh();

    }
, { scope: rootRef }
    );


return (
   
    <div ref={rootRef} className="mx-auto w-full px-6 ">
        < ScrollCounter/>
        <div className=" grid grid-cols-12">



            {/* Left column */}
            <div  className="relative     col-start-2 col-span-8">
                {
                    sections.map((section, index) => (

                        <section key={section.id} className={`image-section-${index} flex min-h-screen items-center`} >

                            <img
                                src={section.image}
                                alt={section.title}
                                className=" h-[98vh] w-full  object-contain"
                            />

                        </section>

                    ))}
            </div>






            {/* Right Column */}
            <div className="relative col-start-10 col-span-3">
                <div className="sticky top-0 flex h-screen justify-center items-center">
                        <div className="relative w-full h-[220px] flex justify-center items-center">
                    {
                        sections.map((section, index) => (
                            <div
                            key={section.id}
                            ref={(el) =>
                            {
                                textRefs.current[index] = el;
                            }}


                                className=" flex flex-col justify-center absolute">
                                <h2 className=" text-xs font-semibold">
                                    {section.title}
                                </h2>
                                <p className=" max-w-md text-xs text-neutral-600">
                                    {section.text}
                                </p>
                            </div>



                        ))
                    }

                    </div>


                </div>



            </div>

        </div>
    </div>
)
}

export default Page
