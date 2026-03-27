"use client";

import { useCallback,useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


type Options ={
    idleTimeoutMs?: number,
}

export function useEngagementTracking(options:Options={} ){

    const {idleTimeoutMs = 5000}= options;
    
    const pathName = usePathname();

    // Internal engine state
    const totalMsRef = useRef(0);
    const activeStartRef = useRef <number | null> (null);
    const lastActiveRef = useRef(0);

    const now = ()=> Date.now();
 


    // Start counting
    const start = useCallback(()=>{
         const isVisible =  document.visibilityState ==="visible";
    const isActive = ()=> now()- lastActiveRef.current <= idleTimeoutMs
        if(!isVisible) return;
        if(!isActive()) return;
        if(activeStartRef.current !== null) return;
        activeStartRef.current = now();
    },[idleTimeoutMs])
    // Stop counting
    const stop = useCallback(()=>{
        if(activeStartRef.current ===null) return;
        totalMsRef.current+= now() - activeStartRef.current;
        activeStartRef.current =null;

    },[])
    

    // Sync state brain
    const sync = useCallback(()=>{
    const isVisible =document.visibilityState ==="visible";
    const isActive = ()=> now()- lastActiveRef.current <= idleTimeoutMs
        if(isActive() && isVisible){
            start()
        }else{stop()};

    },[start,stop,idleTimeoutMs])

        // Mark user activity
        const markActivity = useCallback(()=>{
            lastActiveRef.current = now();
            sync();
        },[sync])

        // Get current engagement time 
        const getEngagementTimeMs = useCallback(()=>{
            let total = totalMsRef.current;
            if(activeStartRef.current!==null){
                total += now()- activeStartRef.current;
                
            
            }

               return Math.floor(total); 
        },[]);



    // Lifecycle
    useEffect(()=>{
        totalMsRef.current=0;
        activeStartRef.current=null;
        lastActiveRef.current=now();

        const onVisibility = ()=> sync();
        const onActivity =()=> markActivity();

        document.addEventListener("visibilitychange",onVisibility);
        window.addEventListener("scroll",onActivity,{passive:true});
        window.addEventListener("mousemove", onActivity,{passive:true});
        window.addEventListener("keydown", onActivity);
        window.addEventListener("touchstart", onActivity,{passive:true});
        window.addEventListener("click", onActivity);

        const interval = setInterval(sync,1000);
        sync();

        return()=>{
            stop();
            document.removeEventListener("visibilitychange",onVisibility);
            window.removeEventListener("scroll",onActivity);
            window.removeEventListener("mousemove", onActivity);
            window.removeEventListener("keydown", onActivity);
            window.removeEventListener("touchstart", onActivity);
            window.removeEventListener("click", onActivity);
            clearInterval(interval);

        };
    },[pathName,sync,stop,markActivity])


    return{

        getEngagementTimeMs,
        markActivity
    }
}