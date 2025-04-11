export interface Bet {
  id: string;
  date: string;
  odd: number;
  balance: number;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  description?: string;
}

export interface BetStats {
  totalBets: number;
  currentBalance: number;
  initialBalance: number;
  targetBalance: number;
  progressPercentage: number;
  averageOdd: number;
  highestOdd: number;
  dayWithMostBets: string;
  betsPerDay: Record<string, number>;
  averageBetsPerDay: number;
  estimatedDaysLeft: number;
}

export interface BetAnalysis {
  difficultyDistribution: Record<string, number>;
  percentDifficultBets: number;
  streaks: {
    current: number;
    longest: number;
  };
  difficultBetsPercentage?: number;
  daysWithMultipleBets?: number;
  topTeamsWithEasyWins?: { team: string; easyWins: number }[];
  hasTooManyDifficultBets?: boolean;
  hasMultipleBetsInSameDay?: boolean;
} 