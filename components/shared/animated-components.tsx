'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

type AnimatedComponentProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

function FadeIn({ children, className, delay = 0, duration = 0.5 }: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={fadeInVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className, delay = 0, duration = 0.3 }: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={scaleInVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, className, delay = 0, duration = 0.5 }: AnimatedComponentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={slideInVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export { FadeIn, ScaleIn, SlideIn, StaggerContainer };