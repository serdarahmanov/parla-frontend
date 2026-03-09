
import { GoogleTagManager } from "@next/third-parties/google";
import { IBM_Plex_Sans, Geist } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import PageTransition from "./components/PageTransition";
import ScrollCounter from "./components/ScrollCounter";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
 import { Toaster } from "sonner";    

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

 export const metadata: Metadata = {
  title: "Parla",
  description: "Digital Marketing Agency",
};

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"]
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {





  return (
    <html lang="en" className={cn("m-0 p-0", "font-sans", geist.variable)} >
      <body className={`${ibmPlexSans.className} relative p-0 m-0 min-h-screen bg-black text-ce-text`} >
       
         <Toaster richColors position="top-right" /> 
         <Header />
        <NavBar />
        <PageTransition>
        <main className="p-0 m-0 min-h-full w-full relative">
          
          {children}
        </main>
        </PageTransition>
         
        <Footer />
        <GoogleTagManager gtmId="GTM-MM9N6562"/>
      </body>
    </html>
  );
}
