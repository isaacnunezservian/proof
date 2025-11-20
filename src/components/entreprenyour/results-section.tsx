"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart, RefreshCw, Share2 } from 'lucide-react';
import type { ResultData } from '@/lib/types';
import { ResultsChart } from './results-chart';
import { getProfileDescriptionsAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

type ResultsSectionProps = {
  result: ResultData;
  onRestart: () => void;
};

export function ResultsSection({ result, onRestart }: ResultsSectionProps) {
  const [profileDescriptions, setProfileDescriptions] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function fetchDescriptions() {
      const descriptions = await getProfileDescriptionsAction();
      setProfileDescriptions(descriptions);
    }
    fetchDescriptions();
  }, []);

  const profileDescription = profileDescriptions ? profileDescriptions[result.profile.name] : result.profile.description;

  const handleShare = () => {
    const text = `¡Descubrí mi perfil de emprendedor en EntreprenYOUr Mixer! Soy del grupo ${result.color.name.toUpperCase()} ${result.color.emoji} con el perfil de ${result.profile.name}. ¡Descubre el tuyo!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Mi Perfil EntreprenYOUr Mixer',
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in-50 duration-500">
      <Card className="text-center shadow-xl overflow-hidden" style={{'--tw-shadow-color': result.color.hex} as React.CSSProperties}>
         <div className="p-8 md:p-12" style={{ backgroundColor: result.color.hex }}>
          <h2 className="text-2xl font-bold text-white">Tu Grupo Asignado es</h2>
          <div className="text-7xl md:text-9xl font-black my-4 text-white text-shadow-lg animate-pulse" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.3)'}}>
            {result.color.name.toUpperCase()}
          </div>
          <div className="text-6xl">{result.color.emoji}</div>
        </div>
        <CardContent className="p-6 bg-card">
          <CardTitle className="text-3xl font-bold">Perfil Dominante: {result.profile.name}</CardTitle>
          <div className="mt-4 text-muted-foreground text-lg min-h-[4rem]">
            {profileDescriptions ? (
              <p>{profileDescription}</p>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Distribución de tus Respuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResultsChart data={result.answerDistribution} color={result.color.hex} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>¿Cómo funciona?</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Clasificación de Perfil</AccordionTrigger>
              <AccordionContent>
                Tu perfil se determina contando la letra más frecuente en tus respuestas. En caso de empate, se usa un orden de prioridad (TECH {'>'} COMERCIAL {'>'} CREATIVO {'>'} ESTRATEGA {'>'} NOVATO) para asignarte el perfil más especializado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Asignación de Grupos por Color (Round-Robin)</AccordionTrigger>
              <AccordionContent>
                Para asegurar que los grupos de colores sean diversos, usamos un sistema "Round-Robin". Mantenemos un contador para cada tipo de perfil. Cuando llegas, tomamos el contador de tu perfil (ej. TECH), lo usamos para asignarte un color de forma secuencial (Rojo, Azul, Verde...), y luego incrementamos ese contador. Esto garantiza que el próximo TECH reciba el siguiente color, mezclando los perfiles de forma equitativa en todos los grupos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={onRestart}>
          <RefreshCw className="mr-2 h-5 w-5" />
          Reiniciar Test
        </Button>
        <Button size="lg" variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-5 w-5" />
          Compartir Mi Perfil
        </Button>
      </div>
    </div>
  );
}
