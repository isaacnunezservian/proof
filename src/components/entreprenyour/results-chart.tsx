"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { ResultData } from '@/lib/types';

interface ResultsChartProps {
  data: ResultData['answerDistribution'];
  color: string;
}

export function ResultsChart({ data, color }: ResultsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
        <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            color: "hsl(var(--card-foreground))",
            borderRadius: "var(--radius)",
          }}
          cursor={{ fill: "hsla(var(--primary), 0.1)" }}
        />
        <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
