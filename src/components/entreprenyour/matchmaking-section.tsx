"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';
import { MATCHMAKING_OPTIONS } from '@/lib/constants';

type MatchmakingSectionProps = {
  onStartQuiz: () => void;
};

export function MatchmakingSection({ onStartQuiz }: MatchmakingSectionProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedOptions(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <Card className="mb-12 md:mb-16 shadow-xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold">1. Matchmaking de Intereses</CardTitle>
        <CardDescription>Selecciona tus intereses para que otros puedan encontrarte.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-6">
          <div className="space-y-4">
            {MATCHMAKING_OPTIONS.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions[option.id] || false}
                  onCheckedChange={(checked) => handleCheckboxChange(option.id, !!checked)}
                  aria-labelledby={`label-${option.id}`}
                />
                <label
                  htmlFor={option.id}
                  id={`label-${option.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartQuiz} className="w-full md:w-auto ml-auto" size="lg">
          Continuar al Test de Grupos
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
