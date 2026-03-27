import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  introDone: boolean;
};

const PageTransition = ({ children, introDone }: Props) => {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const hideFooter = pathname?.startsWith("/work/");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  });

  useLayoutEffect(() => {
    setReady(false);
    // window.scrollTo(0,0);

    const id = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const anim = (variants: Variants) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };

  const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: ready ? 1 : 0,
    },
    exit: {
      opacity: 1,
    },
  };

  const slide = {
    initial: {
      top: "100vh",
    },
    enter: {
      top: "100vh",
    },
    exit: {
      top: "0",
      // scale: 1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const perspective = {
    initial: {
      // y: 0,
      // scale: 1,
      opacity: 1,
    },
    enter: {
      // y: 0,
      // scale: 1,
      opacity: 1,
    },
    exit: {
      // y: -100,
      // scale: 0.9,
      opacity: 0.2,
      clipPath: "inset(100px 300px 100px 300px)",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  if (!introDone) return null;

  return (
    <div className="inner">
      <motion.div {...anim(slide)} className="slide"></motion.div>
      <motion.div {...anim(perspective)} className="page">
        <motion.div {...anim(opacity)}>
          <Header />
          <NavBar />

          {children}
          {!hideFooter && <Footer />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageTransition;
