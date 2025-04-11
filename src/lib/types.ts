export interface Bet {
  id: string;
  date: string; // ISO string
  odd: number;
  balanceBefore: number;
  balanceAfter: number;
  team1?: string;
  team2?: string;
  difficulty?: 'Fácil' | 'Mediana' | 'Difícil';
}

export interface BetStats {
  totalBets: number;
  averageBetsPerDay: number;
  currentBalance: number;
  targetBalance: number;
  progressPercentage: number;
  estimatedDaysLeft: number;
}

export interface TeamStats {
  team: string;
  easyWins: number;
}

export interface BetAnalysis {
  difficultBetsPercentage: number;
  daysWithMultipleBets: number;
  topTeamsWithEasyWins: TeamStats[];
  hasTooManyDifficultBets: boolean;
  hasMultipleBetsInSameDay: boolean;
} 