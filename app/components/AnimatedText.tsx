"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({
  text,
  className = "",
}: AnimatedTextProps) {
  const words = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(20px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
