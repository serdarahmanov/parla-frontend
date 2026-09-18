import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Footer from "@/components/Footer";
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

  const opacity: Variants = {
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

  const perspective: Variants = {
    initial: {
      opacity: 1,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
  };

  if (!introDone) return null;

  return (
    <div className="inner">
      <motion.div {...anim(perspective)} className="page">
        <motion.div {...anim(opacity)}>
          

          {children}
          {!hideFooter && <Footer />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageTransition;
