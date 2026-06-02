'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How does StudyFlow AI work?',
    answer: 'StudyFlow AI uses advanced language models to understand your questions and provide accurate, helpful answers. Simply paste your notes or type your question, and our AI will analyze the content to generate summaries, explanations, quizzes, and more.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take security very seriously. All your notes and data are encrypted at rest and in transit. We never use your personal data to train our AI models, and you can delete your data at any time.',
  },
  {
    question: 'What languages does it support?',
    answer: 'Currently, StudyFlow AI supports Hindi and English translations. Our AI can translate content between these languages and explain concepts in either language.',
  },
  {
    question: 'Can I create custom quizzes?',
    answer: 'Absolutely! You can generate quizzes on any topic you want. Just specify the subject, difficulty level, and number of questions, and our AI will create a personalized quiz for you.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a free tier that includes 50 messages per month. You can upgrade to Pro for unlimited access to all features including unlimited notes, quizzes, and priority support.',
  },
  {
    question: 'How accurate are the AI-generated quizzes?',
    answer: 'Our AI generates quizzes based on the content you provide. While we strive for accuracy, we recommend using the explanations provided with each answer to verify your understanding of the material.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about StudyFlow AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted-foreground transition-transform duration-200',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
