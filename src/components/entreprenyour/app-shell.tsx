"use client";

import { useState, useEffect, useRef } from 'react';
import { HeroSection } from '@/components/entreprenyour/hero-section';
import { MatchmakingSection } from '@/components/entreprenyour/matchmaking-section';
import { QuizSection } from '@/components/entreprenyour/quiz-section';
import { ResultsSection } from '@/components/entreprenyour/results-section';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import {
  calculateDominantProfile,
  assignColorAndIncrementCounter,
  saveUserResult,
  getUserResult,
  clearUserResult,
} from '@/lib/classification';
import type { ResultData, Answer } from '@/lib/types';
import { QUIZ_QUESTIONS, PROFILES } from '@/lib/constants';

type AppState = 'idle' | 'quiz' | 'results';

export function AppShell() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [result, setResult] = useState<ResultData | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedResult = getUserResult();
    if (savedResult) {
      setResult(savedResult);
      setAppState('results');
    }
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleStartQuiz = () => {
    setAppState('quiz');
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleQuizComplete = (answers: Answer[]) => {
    const profile = calculateDominantProfile(answers);
    const color = assignColorAndIncrementCounter(profile.id);
    const answerDistribution = (['A', 'B', 'C', 'D', 'E'] as Answer[]).map(
      (id) => ({
        name: id,
        count: answers.filter((a) => a === id).length,
      })
    );

    const newResult: ResultData = {
      profile,
      color,
      answers,
      answerDistribution,
      timestamp: Date.now(),
    };

    setResult(newResult);
    saveUserResult(newResult);
    setAppState('results');
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRestart = () => {
    clearUserResult();
    setResult(null);
    setAppState('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          EntreprenYOUr Mixer
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Conecta, colabora y crea grupos de trabajo balanceados en nuestro próximo evento de emprendimiento.
        </p>
      </header>

      <HeroSection />
      
      <div className="max-w-4xl mx-auto">
        {(appState === 'idle' || appState === 'quiz') && (
            <MatchmakingSection onStartQuiz={handleStartQuiz} />
        )}
        
        <div ref={quizRef} className="scroll-mt-20">
          {appState === 'quiz' && (
            <QuizSection onQuizComplete={handleQuizComplete} />
          )}
          {appState === 'results' && result && (
            <ResultsSection result={result} onRestart={handleRestart} />
          )}
        </div>
      </div>
      {showScroll && (
        <Button
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-6 w-6" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </div>
  );
}
