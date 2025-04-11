import { useState, useEffect } from 'react';
import { Bet, BetStats, BetAnalysis } from '@/types';

interface UseBetsReturn {
  bets: Bet[];
  stats: BetStats;
  analysis: BetAnalysis;
  activeTab: 'dashboard' | 'history';
  setActiveTab: (tab: 'dashboard' | 'history') => void;
  addBet: (odd: number, team1?: string, team2?: string, difficulty?: 'Fácil' | 'Médio' | 'Difícil') => void;
  removeBet: (betId: string) => void;
  resetBets: () => void;
}

// Função para criar uma data anterior com base em dias para trás
const getPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export function useBets(): UseBetsReturn {
  const [bets, setBets] = useState<Bet[]>(() => {
    if (typeof window !== 'undefined') {
      const savedBets = localStorage.getItem('bets');
      return savedBets ? JSON.parse(savedBets) : [];
    }
    return [];
  });
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');
  
  // Saldo inicial ajustado para R$1000
  const realInitialBalance = 1000;
  const targetBalance = 100000;
  
  // Valor atual considerando as 4 apostas fictícias
  const currentBalanceWithFictitious = 1397.58;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bets', JSON.stringify(bets));
    }
  }, [bets]);

  // Calcula estatísticas das apostas (incluindo as fictícias)
  const stats: BetStats = bets.reduce((acc: Partial<BetStats>, bet) => {
    // Média de odds
    acc.averageOdd = bets.length > 0
      ? ((acc.averageOdd || 0) * (bets.length - 1) + bet.odd) / bets.length
      : bet.odd;
    
    // Maior odd
    if (!acc.highestOdd || bet.odd > acc.highestOdd) {
      acc.highestOdd = bet.odd;
    }

    // Dia com mais apostas
    const betDate = new Date(bet.date).toLocaleDateString();
    
    // Inicializa o objeto betsPerDay se não existir
    if (!acc.betsPerDay) {
      acc.betsPerDay = {};
    }
    
    // Inicializa a contagem para a data se não existir
    if (!acc.betsPerDay[betDate]) {
      acc.betsPerDay[betDate] = 0;
    }
    
    // Incrementa a contagem de apostas para o dia
    acc.betsPerDay[betDate] += 1;

    // Dia com mais apostas
    const betsPerDay = acc.betsPerDay || {}; // Para evitar undefined
    const maxBetsCount = Math.max(...Object.values(betsPerDay));
    acc.dayWithMostBets = Object.keys(betsPerDay).find(
      date => betsPerDay[date] === maxBetsCount
    ) || '';
    
    return acc;
  }, {
    totalBets: bets.length,
    currentBalance: bets.length > 0 ? bets[bets.length - 1].balance : currentBalanceWithFictitious,
    initialBalance: realInitialBalance,
    targetBalance,
    progressPercentage: 0,
    averageOdd: 0,
    highestOdd: 0,
    betsPerDay: {},
    dayWithMostBets: '',
    averageBetsPerDay: 0,
    estimatedDaysLeft: 0,
  }) as BetStats;

  // Adicionar as 4 apostas fictícias nas estatísticas
  // Se não houver apostas ainda, vamos configurar as estatísticas fictícias
  if (bets.length === 0) {
    // Adiciona 4 apostas fictícias distribuídas em 3 dias
    const fictionalBetsPerDay = {
      [new Date(getPastDate(3)).toLocaleDateString()]: 2,  // 2 apostas há 3 dias
      [new Date(getPastDate(2)).toLocaleDateString()]: 1,  // 1 aposta há 2 dias
      [new Date(getPastDate(1)).toLocaleDateString()]: 1,  // 1 aposta há 1 dia
    };
    
    stats.betsPerDay = fictionalBetsPerDay;
    stats.dayWithMostBets = new Date(getPastDate(3)).toLocaleDateString();
    stats.totalBets = 4 + bets.length;
    stats.averageOdd = 1.05; // Odd média ajustada para 1.05
    stats.highestOdd = 1.08; // Maior odd ajustada para 1.08
    stats.currentBalance = currentBalanceWithFictitious;
  } else {
    // Se já existem apostas, mantém os dados existentes
    stats.totalBets += 4; // Adiciona as 4 apostas fictícias ao total
    
    // Adiciona os dias fictícios se ainda não existirem no betsPerDay
    const day3 = new Date(getPastDate(3)).toLocaleDateString();
    const day2 = new Date(getPastDate(2)).toLocaleDateString();
    const day1 = new Date(getPastDate(1)).toLocaleDateString();
    
    if (!stats.betsPerDay[day3]) stats.betsPerDay[day3] = 2;
    if (!stats.betsPerDay[day2]) stats.betsPerDay[day2] = 1;
    if (!stats.betsPerDay[day1]) stats.betsPerDay[day1] = 1;
    
    // Recalcula o dia com mais apostas
    const maxBetsCount = Math.max(...Object.values(stats.betsPerDay));
    stats.dayWithMostBets = Object.keys(stats.betsPerDay).find(
      date => stats.betsPerDay[date] === maxBetsCount
    ) || '';
  }

  // Calcula porcentagem de progresso
  stats.progressPercentage = (stats.currentBalance / stats.targetBalance) * 100;
  
  // Calcula média de apostas por dia
  const totalDays = Object.keys(stats.betsPerDay).length || 1;
  stats.averageBetsPerDay = stats.totalBets / totalDays;
  
  // Calcula dias estimados para atingir a meta considerando apostas fixas com odd 1.05
  // e exatamente 1 aposta por dia
  const fixedOdd = 1.05; // Odd fixa para todas as apostas futuras
  
  // Calcula o número de vezes que é preciso multiplicar o saldo por 1.05 para chegar a 100k
  const targetGrowthFactor = stats.targetBalance / stats.currentBalance;
  const apostasNecessarias = Math.log(targetGrowthFactor) / Math.log(fixedOdd);
  
  // Como fazemos exatamente 1 aposta por dia, o número de dias é igual ao número de apostas
  stats.estimatedDaysLeft = Math.ceil(apostasNecessarias);
  
  // Análise das apostas
  const analysis: BetAnalysis = {
    difficultyDistribution: {
      'Fácil': 0,
      'Médio': 0,
      'Difícil': 0
    },
    percentDifficultBets: 0,
    streaks: {
      current: 0,
      longest: 0
    },
    difficultBetsPercentage: 0,
    daysWithMultipleBets: 0,
    topTeamsWithEasyWins: [],
    hasTooManyDifficultBets: false,
    hasMultipleBetsInSameDay: false
  };

  // Calcula distribuição de dificuldade incluindo as apostas reais
  bets.forEach(bet => {
    if (bet.difficulty) {
      analysis.difficultyDistribution[bet.difficulty] = (analysis.difficultyDistribution[bet.difficulty] || 0) + 1;
    }
  });
  
  // Adiciona as 4 apostas fictícias (todas fáceis)
  analysis.difficultyDistribution['Fácil'] += 4;
  
  // Calcula porcentagem de apostas difíceis
  const totalBetsWithDifficulty = Object.values(analysis.difficultyDistribution).reduce((sum, count) => sum + count, 0);
  analysis.percentDifficultBets = totalBetsWithDifficulty > 0
    ? (analysis.difficultyDistribution['Difícil'] / totalBetsWithDifficulty) * 100
    : 0;
  
  // Compatibilidade com a interface antiga
  analysis.difficultBetsPercentage = analysis.percentDifficultBets;
  
  // Verifica dias com múltiplas apostas
  analysis.daysWithMultipleBets = Object.values(stats.betsPerDay).filter(count => count > 1).length;
  analysis.hasMultipleBetsInSameDay = analysis.daysWithMultipleBets > 0;
  
  // Verifica se há muitas apostas difíceis
  analysis.hasTooManyDifficultBets = analysis.percentDifficultBets > 30;

  // Adiciona times populares para apostas fáceis ficticias
  analysis.topTeamsWithEasyWins = [
    { team: 'Barcelona', easyWins: 1 },
    { team: 'PSG', easyWins: 1 },
    { team: 'Manchester City', easyWins: 1 },
    { team: 'Bayern Munich', easyWins: 1 }
  ];

  // Adiciona uma nova aposta
  const addBet = (odd: number, team1?: string, team2?: string, difficulty: 'Fácil' | 'Médio' | 'Difícil' = 'Médio') => {
    if (odd <= 1) {
      throw new Error('A odd deve ser maior que 1');
    }
    
    const currentBalance = bets.length > 0 ? bets[bets.length - 1].balance : currentBalanceWithFictitious;
    const newBalance = currentBalance * odd;
    
    const newBet: Bet = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      odd,
      balance: newBalance,
      difficulty,
      description: team1 && team2 ? `${team1} vs ${team2}` : undefined
    };
    
    setBets(prevBets => [...prevBets, newBet]);
  };

  // Remove uma aposta e ajusta o saldo
  const removeBet = (betId: string) => {
    const betIndex = bets.findIndex(bet => bet.id === betId);
    
    if (betIndex === -1) return;
    
    // Cria uma cópia das apostas antes de modificar
    const updatedBets = [...bets];
    
    // Remove a aposta selecionada
    updatedBets.splice(betIndex, 1);
    
    // Se for a única aposta, simplesmente a removemos
    if (updatedBets.length === 0) {
      setBets([]);
      return;
    }
    
    // Se for a última aposta, não precisamos recalcular saldos
    if (betIndex === bets.length - 1) {
      setBets(updatedBets);
      return;
    }
    
    // Recalcula todos os saldos após a aposta removida
    for (let i = betIndex; i < updatedBets.length; i++) {
      const previousBalance = i === 0 
        ? currentBalanceWithFictitious 
        : updatedBets[i-1].balance;
      
      updatedBets[i] = {
        ...updatedBets[i],
        balance: previousBalance * updatedBets[i].odd
      };
    }
    
    setBets(updatedBets);
  };

  // Limpar todas as apostas
  const resetBets = () => {
    setBets([]);
  };

  return {
    bets,
    stats,
    analysis,
    activeTab,
    setActiveTab,
    addBet,
    removeBet,
    resetBets,
  };
} 