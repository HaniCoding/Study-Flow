'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up with your email or Google account',
    fields: ['email', 'password', 'name'],
  },
  {
    title: 'Choose Plan',
    description: 'Select the plan that fits your needs',
    fields: [],
  },
  {
    title: 'Setup Profile',
    description: 'Tell us about yourself',
    fields: ['interests', 'goals'],
  },
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    interests: '',
    goals: '',
  });
  const router = useRouter();

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      router.push('/dashboard');
      return prev;
    });
  }, [router]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to StudyFlow AI</h1>
          <p className="text-muted-foreground mt-2">
            Let&apos;s get you set up in just a few steps
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-12 mx-2 transition-colors ${
                        index < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {currentStep === 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ob-name">Full Name</Label>
                    <Input
                      id="ob-name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ob-email">Email</Label>
                    <Input
                      id="ob-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ob-password">Password</Label>
                    <Input
                      id="ob-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  {[
                    {
                      name: 'Free',
                      price: 0,
                      features: ['50 AI messages', '10 notes', '5 quizzes'],
                    },
                    {
                      name: 'Pro',
                      price: 12,
                      features: [
                        'Unlimited AI messages',
                        'Unlimited notes',
                        'Priority support',
                      ],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{plan.name}</span>
                        <span className="text-primary font-bold">
                          ${plan.price}/mo
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ob-interests">
                      What subjects interest you?
                    </Label>
                    <Input
                      id="ob-interests"
                      placeholder="Mathematics, Science, History..."
                      value={formData.interests}
                      onChange={(e) =>
                        setFormData({ ...formData, interests: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ob-goals">
                      What are your learning goals?
                    </Label>
                    <Input
                      id="ob-goals"
                      placeholder="Get better grades, learn new skills..."
                      value={formData.goals}
                      onChange={(e) =>
                        setFormData({ ...formData, goals: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1 gap-2">
                  {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}