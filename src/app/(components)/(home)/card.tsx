"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import "@/style/components/home/card.scss";

export default function Card({ url, title }: { url: string; title: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseEvent = (e: any) => {
    const pos = (a: number, b: number, c: number) => (a - b) * c;
    const pageX = e.clientX;
    const pageY = e.clientY;
    const target = e.target.getBoundingClientRect();
    const targetX = target.left + e.target.clientWidth / 2;
    const targetY = target.top + e.target.clientHeight / 2;
    setMousePos({ x: pos(pageY, targetY, 0.1), y: pos(pageX, targetX, -0.1) });
  };

  const mouseEndEvent = () => setMousePos({ x: 0, y: 0 });
  return (
    <>
      <a href="https://page.kakao.com/" className="card-wrap">
        <motion.div
          onMouseMove={(e) => mouseEvent(e)}
          onHoverEnd={mouseEndEvent}
          whileHover={{ zIndex: 9 }}
          className="card"
          animate={{ rotateX: mousePos.x, rotateY: mousePos.y }}
        >
          <div
            className="card-img"
            style={{ backgroundImage: `url(${url})` }}
          ></div>
        </motion.div>
      </a>
    </>
  );
}
