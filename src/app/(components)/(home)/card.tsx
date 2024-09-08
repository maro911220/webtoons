"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "@/style/components/home/card.scss";

export default function Card({ title }: { title: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 마우스 이동 함수, 마우스 좌표에 따른 값 계산
  const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.getBoundingClientRect();
    const pos = (a: number, b: number, c: number) => (a - b) * c;
    setMousePos({
      x: pos(e.clientY, target.top + target.height / 2, 0.1),
      y: pos(e.clientX, target.left + target.width / 2, -0.1),
    });
  };

  // 마우스 좌표 값 초기화
  const resetMousePos = () => setMousePos({ x: 0, y: 0 });

  // 카드커버 애니메이션 variant
  const cardCoverVariant = {
    hover: { opacity: 1 },
    animate: {
      background: `linear-gradient(135deg, rgba(255,255,255,0.1) ${
        mousePos.x + 20
      }%, rgba(255,255,255,0.5) ${mousePos.x + 50}%, rgba(255,255,255,0) ${
        mousePos.x + 80
      }%, rgba(255,255,255,0) 100%)`,
      transition: { background: { duration: 0.3 } },
    },
  };

  return (
    <>
      <Link href={`/list/${title.toUpperCase()}`} className="card-wrap">
        <motion.div
          onMouseMove={handleMouseEvent}
          onMouseLeave={resetMousePos}
          whileHover={{ zIndex: 9 }}
          className="card"
          style={{ backgroundImage: `url(/img/bg_${title}.png)` }}
          animate={{ rotateX: mousePos.x, rotateY: mousePos.y }}
        >
          <motion.div
            className="card-cover"
            variants={cardCoverVariant}
            whileHover="hover"
            animate="animate"
          ></motion.div>
          <div
            className="card-img"
            style={{ backgroundImage: `url(/icon/logo_${title}.svg)` }}
          ></div>
        </motion.div>
      </Link>
    </>
  );
}
