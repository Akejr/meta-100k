import React, { useState } from 'react';
import { Bet } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface BetHistoryProps {
  bets: Bet[];
  onRemoveBet: (id: string) => void;
}

const BetHistory: React.FC<BetHistoryProps> = ({ bets, onRemoveBet }) => {
  const [betToDelete, setBetToDelete] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil' | null>(null);

  // Ordenar as apostas da mais recente para a mais antiga
  const sortedBets = [...bets].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filtrar apostas por dificuldade se o filtro estiver ativo
  const filteredBets = selectedDifficulty 
    ? sortedBets.filter(bet => bet.difficulty === selectedDifficulty)
    : sortedBets;

  const getDifficultyColor = (difficulty?: 'Fácil' | 'Médio' | 'Difícil') => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Médio': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Difícil': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCardBorder = (difficulty?: 'Fácil' | 'Médio' | 'Difícil') => {
    switch (difficulty) {
      case 'Fácil': return 'border-l-green-500';
      case 'Médio': return 'border-l-yellow-500';
      case 'Difícil': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  const handleDeleteBet = (id: string) => {
    if (betToDelete === id) {
      onRemoveBet(id);
      setBetToDelete(null);
    } else {
      setBetToDelete(id);
    }
  };

  const toggleDifficultyFilter = (difficulty: 'Fácil' | 'Médio' | 'Difícil') => {
    if (selectedDifficulty === difficulty) {
      setSelectedDifficulty(null);
      setFilterActive(false);
    } else {
      setSelectedDifficulty(difficulty);
      setFilterActive(true);
    }
  };

  if (bets.length === 0) {
    return (
      <div className="glass-card p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--muted-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Histórico de Apostas</h2>
            <p className="text-sm text-[var(--muted-text)]">Acompanhe sua evolução</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.03)] flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--muted-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-center text-lg font-medium mb-2">
            Nenhuma aposta registrada
          </p>
          <p className="text-center text-[var(--muted-text)] mb-6 max-w-md">
            Comece a registrar suas apostas para acompanhar seu progresso em direção à meta de R$100.000,00.
          </p>
          <button className="glass-button py-2 px-4 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Adicionar Primeira Aposta</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Histórico de Apostas</h2>
            <div className="flex items-center">
              <p className="text-sm text-[var(--muted-text)]">
                {filteredBets.length} {filteredBets.length === 1 ? 'aposta' : 'apostas'} 
              </p>
              {filterActive && (
                <div className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                  Filtro ativo
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => toggleDifficultyFilter('Fácil')}
            className={`py-1 px-3 rounded-full text-xs font-medium border ${
              selectedDifficulty === 'Fácil' 
                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                : 'bg-transparent text-[var(--muted-text)] border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.05)]'
            } transition-colors`}
          >
            Fácil
          </button>
          <button 
            onClick={() => toggleDifficultyFilter('Médio')}
            className={`py-1 px-3 rounded-full text-xs font-medium border ${
              selectedDifficulty === 'Médio' 
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                : 'bg-transparent text-[var(--muted-text)] border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.05)]'
            } transition-colors`}
          >
            Médio
          </button>
          <button 
            onClick={() => toggleDifficultyFilter('Difícil')}
            className={`py-1 px-3 rounded-full text-xs font-medium border ${
              selectedDifficulty === 'Difícil' 
                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                : 'bg-transparent text-[var(--muted-text)] border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.05)]'
            } transition-colors`}
          >
            Difícil
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredBets.map((bet, index) => {
          const date = new Date(bet.date);
          const formattedDate = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}`;
          const isDeleteConfirm = betToDelete === bet.id;
          const profit = bet.balance - (bets[index - 1]?.balance || 1397.58);
          const profitPercentage = ((bet.balance / (bets[index - 1]?.balance || 1397.58)) - 1) * 100;
          
          return (
            <div 
              key={bet.id} 
              className={`neumorph p-4 border-l-4 transition-all duration-300 hover:shadow-xl ${
                isDeleteConfirm 
                  ? 'border-l-[var(--error)]' 
                  : getCardBorder(bet.difficulty)
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--muted-text)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-[var(--muted-text)]">{formattedDate}</span>
                </div>
                <button
                  onClick={() => handleDeleteBet(bet.id)}
                  className={`transition-all duration-300 text-sm rounded-md ${
                    isDeleteConfirm 
                      ? 'bg-[var(--error)] text-white py-1 px-3' 
                      : 'text-[var(--muted-text)] hover:text-[var(--error)]'
                  }`}
                  aria-label={isDeleteConfirm ? "Confirmar exclusão" : "Remover aposta"}
                >
                  {isDeleteConfirm ? (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Confirmar</span>
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Informações da partida com design aprimorado */}
              {bet.description && (
                <div className="relative mb-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(59,130,246,0.05)]"></div>
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <p className="font-medium text-lg">{bet.description}</p>
                      {bet.difficulty && (
                        <div className="mt-2">
                          <span className={`py-1 px-3 rounded-full text-xs font-medium border ${getDifficultyColor(bet.difficulty)}`}>
                            {bet.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-3">
                <div className="stat-card flex flex-col items-center">
                  <p className="text-xs text-[var(--muted-text)] mb-1">ODD</p>
                  <div className="flex items-baseline">
                    <p className="text-xl font-bold">{bet.odd.toFixed(2)}</p>
                    <p className="text-xs text-[var(--muted-text)] ml-1">x</p>
                  </div>
                </div>
                
                <div className="stat-card flex flex-col items-center">
                  <p className="text-xs text-[var(--muted-text)] mb-1">Antes</p>
                  <p className="text-base font-medium">{formatCurrency(bets[index - 1]?.balance || 1397.58)}</p>
                </div>
                
                <div className="stat-card flex flex-col items-center">
                  <p className="text-xs text-[var(--muted-text)] mb-1">Depois</p>
                  <p className="text-base font-medium text-[var(--success)]">{formatCurrency(bet.balance)}</p>
                </div>
              </div>
              
              {/* Detalhes de lucro */}
              <div className="mt-3 p-2 rounded-lg bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.1)] flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-green-500 font-medium">Lucro</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-green-500">
                    {formatCurrency(profit)}
                  </span>
                  <span className="ml-1 py-0.5 px-1.5 text-xs font-medium rounded-md bg-green-500/20 text-green-400">
                    +{profitPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BetHistory; 