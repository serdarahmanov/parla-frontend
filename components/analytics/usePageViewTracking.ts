"use client";

import { useEffect } from "react";
import  type { NextRouter } from "next/router";
import { worksBySlug } from "../data/works";
const FALLBACK_TITLE = "Parla";

function getCurrentPageTitle(){
    return document.title || FALLBACK_TITLE
}

function normalize(input: string){
    const noHash = input.split("#")[0];
    return noHash.split("?")[0];

}


function getAnalyticsTitle(pathOrUrl:string){
    const path = normalize(pathOrUrl);

    if(path=="/") return "Parla";
    if(path==="/about") return "About | Parla";
    if(path==="/work") return "Work | Parla";
    if(path==="/cookie") return "Cookie Policy | Parla";
    if(path==="/privacy-policy") return "Privacy Policy | Parla";
    if(path==="/by-rahmanov") return "By Rahmanov | Parla";

    if(path.startsWith("/work/")){
        const slug = decodeURIComponent (path.replace("/work/","").split("/")[0] ||"");
        const work  = worksBySlug[slug];
        if(work) return `${work.clientName} - ${work.videoName} | Parla`;
    }

    return getCurrentPageTitle()
}

function pushPageView (){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "page_view",
        page_location: window.__pageContext?.currentPageLocation || window.location.href,
        page_referrer: window.__pageContext?.currentPageReferrer || document.referrer ||"",
        page_title: window.__pageContext?.currentPageTitle || getCurrentPageTitle(),
    });
}

export function usePageViewTracking (router: NextRouter){

    useEffect(()=>{
        if(typeof window === "undefined") return;
        const initialPath = normalize( router.asPath || window.location.href);
        window.__pageContext = {
            currentPageLocation: window.location.href,
            currentPageReferrer: document.referrer || "",
            currentPageTitle: getAnalyticsTitle(initialPath),
        };

        pushPageView();

        const onRouteChangeComplete = (url: string)=>{
            const previousLocation = window.__pageContext?.currentPageLocation || window.location.href;
        window.__pageContext = {
            currentPageLocation: window.location.href,
            currentPageReferrer: previousLocation,
            currentPageTitle: getAnalyticsTitle(url),

        }

        pushPageView()


        }

        router.events.on("routeChangeComplete", onRouteChangeComplete);
        return()=>{
            router.events.off("routeChangeComplete", onRouteChangeComplete);
        }


    },[router])



}