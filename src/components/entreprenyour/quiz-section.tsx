"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QUIZ_QUESTIONS } from '@/lib/constants';
import type { Answer } from '@/lib/types';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type QuizSectionProps = {
  onQuizComplete: (answers: Answer[]) => void;
};

export function QuizSection({ onQuizComplete }: QuizSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const totalQuestions = QUIZ_QUESTIONS.length;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);
  
  const handleAnswer = (questionIndex: number, answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current === totalQuestions - 1) {
      onQuizComplete(answers);
    } else {
      api?.scrollNext();
    }
  };
  
  const canGoNext = answers[current] !== undefined;
  const progress = ((current + (canGoNext ? 1: 0)) / totalQuestions) * 100;

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold">2. Test de Perfil</CardTitle>
        <CardDescription>Responde 7 preguntas para encontrar tu grupo ideal.</CardDescription>
        <div className="pt-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2 text-center">Pregunta {current + 1} de {totalQuestions}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
          <CarouselContent>
            {QUIZ_QUESTIONS.map((q, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <p className="text-lg font-semibold mb-6 text-center h-12 flex items-center justify-center">{q.question}</p>
                  <RadioGroup
                    value={answers[index]}
                    onValueChange={(value) => handleAnswer(index, value as Answer)}
                    className="space-y-3"
                  >
                    {q.options.map((opt) => (
                      <Label
                        key={opt.id}
                        htmlFor={`${index}-${opt.id}`}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary ${answers[index] === opt.id ? 'border-primary bg-primary/10' : 'border-border'}`}
                      >
                        <RadioGroupItem value={opt.id} id={`${index}-${opt.id}`} />
                        <span>{opt.text}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-end">
          <Button onClick={handleNext} disabled={!canGoNext} size="lg">
            {current === totalQuestions - 1 ? 'Ver Mi Perfil' : 'Siguiente'}
          </Button>
      </CardFooter>
    </Card>
  );
}
