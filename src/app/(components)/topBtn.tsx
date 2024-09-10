"use client";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

// style
const topCon = `fixed z-20 bottom-4 left-1/2 w-full max-w-screen-lg -translate-x-1/2 text-right pointer-events-none`;
const topBtn = `bg-rose-700 hover:bg-rose-600 xl:border-0 border border-rose-300 transition-all xl:translate-x-12 -translate-x-8 w-12 h-12 inline-flex justify-center items-center rounded pointer-events-auto`;
const topBtnIco = `w-2/3 h-2/3`;

export default function TopBtn() {
  const { scrollY } = useScroll();
  const [top, setTop] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => setTop(latest));
  const onTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {top > 500 && (
        <motion.div
          className={topCon}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className={topBtn} onClick={onTop}>
            <ChevronUp className={topBtnIco} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
