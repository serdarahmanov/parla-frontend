"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ReactNode, useState } from "react";




export default function ScrollCounter() {

  const { scrollYProgress } = useScroll();
   
  const y = useTransform(scrollYProgress, [0, 1], ["calc(100vh+ 1.85rem)", "calc(50vh - 0.8rem)"]);

  // map scroll progress (0 → 1) to numbers (0 → 100)
  const value = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [count, setCount] = useState(0);

  useMotionValueEvent(value, "change", (latest) => {
    setCount(Math.floor(latest));
  });
  return (
    <div className=" text-xs font-medium overflow-hidden">

      <motion.div style={{ y }} className="overflow-hidden font-medium text-xs bottom-0 right-0 px-6 m-0 p-0 fixed h-screen">
 
       


      <motion.span className="overflow-hidden font-medium text-xs">
       {count}%
      </motion.span>
      </motion.div>
    </div>
  );
}