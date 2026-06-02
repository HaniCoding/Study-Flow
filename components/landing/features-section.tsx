'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, BookOpen, Brain, Zap, Languages, FileText, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Chat',
    description: 'Chat with our advanced AI to get instant explanations, answers, and personalized learning assistance.',
  },
  {
    icon: BookOpen,
    title: 'Smart Notes',
    description: 'Create, organize, and enhance your notes with AI-powered summaries, translations, and formatting.',
  },
  {
    icon: Brain,
    title: 'Quiz Generator',
    description: 'Generate custom quizzes from any topic to test your knowledge and reinforce learning.',
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Translate explanations and content to Hindi and other languages seamlessly.',
  },
  {
    icon: FileText,
    title: 'Progress Analytics',
    description: 'Track your learning progress with detailed analytics and insights.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant responses with our optimized AI infrastructure for seamless learning.',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="features" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to excel
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform provides all the tools you need for effective, personalized learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
