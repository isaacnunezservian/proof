export type MatchmakingOption = {
  id: string;
  label: string;
};

export type Answer = 'A' | 'B' | 'C' | 'D' | 'E';

export type QuizQuestion = {
  question: string;
  options: { id: Answer; text: string }[];
};

export type Profile = {
  id: Answer;
  name: string;
  description: string;
};

export type Color = {
  name: string;
  emoji: string;
  hex: string;
};

export type ResultData = {
  profile: Profile;
  color: Color;
  answers: Answer[];
  answerDistribution: { name: Answer; count: number }[];
  timestamp: number;
};
