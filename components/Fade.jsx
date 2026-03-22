"use client";
import { motion } from "framer-motion";

export default function Fade({ children, delay = 0, className = "", direction = "up" }) {
  const y = direction === "up" ? 20 : direction === "down" ? -20 : 0;
  const x = direction === "left" ? 20 : direction === "right" ? -20 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
