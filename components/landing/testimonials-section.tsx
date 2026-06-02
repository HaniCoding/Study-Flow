'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "StudyFlow AI has completely transformed how I study. I can now understand complex topics in half the time it used to take me.",
    author: "Priya Sharma",
    role: "Medical Student, AIIMS",
    initials: "PS",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote: "The Hindi translation feature is a game changer. As someone who learns better in Hindi, this has been invaluable.",
    author: "Rahul Verma",
    role: "Software Engineer",
    initials: "RV",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote: "I was skeptical at first, but the quiz generator is incredibly accurate. It's like having a personal tutor available 24/7.",
    author: "Sarah Johnson",
    role: "Graduate Student, MIT",
    initials: "SJ",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    quote: "The analytics dashboard helps me track my progress and identify areas where I need more practice. Highly recommend!",
    author: "Alex Chen",
    role: "High School Teacher",
    initials: "AC",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Loved by learners worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users have to say about their experience with StudyFlow AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-sm font-semibold`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
