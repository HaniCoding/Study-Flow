'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Question } from '@/types';

export function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [quizType, setQuizType] = useState<'mcq' | 'true-false' | 'mixed'>('mcq');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<{ topic: string; questions: Question[] } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerateQuiz = useCallback(async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          type: quizType,
          count: questionCount,
          difficulty,
          context: context.trim(),
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to generate quiz');
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuiz({ topic: data.topic || topic, questions: data.questions });
      } else {
        throw new Error('No questions generated');
      }
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error('Quiz generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [topic, quizType, questionCount, difficulty, context]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (showResults) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
    },
    [currentQuestion, showResults]
  );

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentQuestion, quiz]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleReset = useCallback(() => {
    setQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  }, []);

  const score = useMemo(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
      0
    );
  }, [quiz, answers]);

  const totalQuestions = quiz?.questions.length || 0;
  const scorePercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  if (quiz && quiz.questions.length > 0) {
    const q = quiz.questions[currentQuestion];

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{quiz.topic} Quiz</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            New Quiz
          </Button>
        </div>

        <Progress
          value={((currentQuestion + 1) / totalQuestions) * 100}
          className="h-2"
        />

        <Card className="min-h-[400px]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  difficulty === 'easy'
                    ? 'default'
                    : difficulty === 'medium'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {difficulty}
              </Badge>
              <Badge variant="outline">{quizType}</Badge>
            </div>
            <CardTitle className="text-xl mt-4">{q.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === index;
              const isCorrect = index === q.correctAnswer;

              return (
                <motion.button
                  key={`${currentQuestion}-${index}`}
                  whileHover={{ scale: showResults ? 1 : 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(index)}
                  disabled={showResults}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all',
                    isSelected && !showResults
                      ? 'border-primary bg-primary/10'
                      : showResults && isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : showResults && isSelected && !isCorrect
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'h-8 w-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm',
                          isSelected && !showResults
                            ? 'border-primary bg-primary text-primary-foreground'
                            : showResults && isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : showResults && isSelected
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-muted-foreground'
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                    {showResults && isCorrect && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                    {showResults && isSelected && !isCorrect && (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}

            {showResults && q.explanation && (
              <div className="p-4 rounded-xl bg-muted mt-4">
                <p className="text-sm font-medium mb-1">Explanation:</p>
                <p className="text-sm text-muted-foreground">{q.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentQuestion < totalQuestions - 1 ? 'Next' : 'See Results'}
          </Button>
        </div>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10"
          >
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
              {Math.round(scorePercentage)}%
            </div>
            <p className="text-lg text-muted-foreground">
              You got {score} out of {totalQuestions} questions correct
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quiz Generator</h1>
        <p className="text-muted-foreground">
          Create custom quizzes on any topic
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Create New Quiz</CardTitle>
          </div>
          <CardDescription>
            Fill in the details to generate a personalized quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., photosynthesis, quadratic equations..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quiz Type</Label>
              <Select
                value={quizType}
                onValueChange={(v) =>
                  setQuizType(v as 'mcq' | 'true-false' | 'mixed')
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(v) =>
                  setDifficulty(v as 'easy' | 'medium' | 'hard')
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Number of Questions: {questionCount}</Label>
            <input
              type="range"
              min={1}
              max={20}
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
              className="w-full accent-primary"
              aria-label={`Number of questions: ${questionCount}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Additional Context (optional)</Label>
            <Textarea
              id="context"
              placeholder="Paste any relevant text or notes for the quiz..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleGenerateQuiz}
            disabled={!topic.trim() || isGenerating}
            className="w-full gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? 'Generating Quiz...' : 'Generate Quiz'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}