import { Bet, BetStats, BetAnalysis, TeamStats } from "./types";

// Saldo inicial de R$1.000
const INITIAL_BALANCE = 1000;

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function calculateStats(bets: Bet[]): BetStats {
  if (bets.length === 0) {
    return {
      totalBets: 0,
      averageBetsPerDay: 0,
      currentBalance: INITIAL_BALANCE,
      targetBalance: 100000,
      progressPercentage: (INITIAL_BALANCE / 100000) * 100,
      estimatedDaysLeft: 0,
    };
  }

  const totalBets = bets.length;
  const currentBalance = bets[bets.length - 1].balanceAfter;
  const targetBalance = 100000;
  const progressPercentage = (currentBalance / targetBalance) * 100;

  // Calcular dias únicos
  const uniqueDates = new Set(
    bets.map((bet) => new Date(bet.date).toDateString())
  );
  const uniqueDaysCount = uniqueDates.size;
  
  const averageBetsPerDay = uniqueDaysCount > 0 
    ? totalBets / uniqueDaysCount 
    : 0;

  // Estimar dias restantes baseado na aposta diária com odd 1.05
  let daysLeft = 0;
  let simulatedBalance = currentBalance;
  
  while (simulatedBalance < targetBalance) {
    simulatedBalance *= 1.05; // Usando a odd padrão de 1.05
    daysLeft++;
    
    // Evitar loop infinito em caso de valores muito baixos
    if (daysLeft > 1000) break;
  }

  return {
    totalBets,
    averageBetsPerDay,
    currentBalance,
    targetBalance,
    progressPercentage,
    estimatedDaysLeft: daysLeft,
  };
}

export function analyzeBets(bets: Bet[]): BetAnalysis {
  if (bets.length === 0) {
    return {
      difficultBetsPercentage: 0,
      daysWithMultipleBets: 0,
      topTeamsWithEasyWins: [],
      hasTooManyDifficultBets: false,
      hasMultipleBetsInSameDay: false,
    };
  }

  // Contar apostas difíceis
  const difficultBets = bets.filter(bet => bet.difficulty === 'Difícil').length;
  const difficultBetsPercentage = (difficultBets / bets.length) * 100;
  
  // Contar dias com múltiplas apostas
  const betsByDate = bets.reduce((acc, bet) => {
    const date = new Date(bet.date).toDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {} as Record<string, number>);
  
  const daysWithMultipleBets = Object.values(betsByDate).filter(count => count > 1).length;
  
  // Times com vitórias fáceis
  const teamWins = new Map<string, number>();
  
  bets.forEach(bet => {
    if (bet.difficulty === 'Fácil' && bet.team1) {
      const count = teamWins.get(bet.team1) || 0;
      teamWins.set(bet.team1, count + 1);
    }
    if (bet.difficulty === 'Fácil' && bet.team2) {
      const count = teamWins.get(bet.team2) || 0;
      teamWins.set(bet.team2, count + 1);
    }
  });
  
  const topTeamsWithEasyWins: TeamStats[] = Array.from(teamWins.entries())
    .map(([team, easyWins]) => ({ team, easyWins }))
    .sort((a, b) => b.easyWins - a.easyWins)
    .slice(0, 3);
  
  // Análise final
  const hasTooManyDifficultBets = difficultBetsPercentage > 30;
  const hasMultipleBetsInSameDay = daysWithMultipleBets > 0;
  
  return {
    difficultBetsPercentage,
    daysWithMultipleBets,
    topTeamsWithEasyWins,
    hasTooManyDifficultBets,
    hasMultipleBetsInSameDay,
  };
} 