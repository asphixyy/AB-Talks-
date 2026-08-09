import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: 1,
    }
  }
};

const charVariants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function RotatingText({ texts, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const currentItem = texts[index];
  const textStr = typeof currentItem === 'object' ? currentItem.text : currentItem;
  const className = typeof currentItem === 'object' ? currentItem.className : '';
  const chars = textStr.split('');

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        style={{ display: 'inline-flex' }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {chars.map((char, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              variants={charVariants}
              style={{ display: 'inline-block' }}
              className={className}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
