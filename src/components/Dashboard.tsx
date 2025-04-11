import React, { useState } from 'react';
import { BetStats, BetAnalysis } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface DashboardProps {
  stats: BetStats;
  analysis: BetAnalysis;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, analysis }) => {
  const [showInsights, setShowInsights] = useState(true);

  return (
    <div className="space-y-5 pb-20">
      {/* Card principal - Saldo */}
      <div className="card-highlight p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Saldo Atual</h2>
          <span className="text-xs bg-blue-500/20 text-blue-400 py-0.5 px-2 rounded-full">Meta: 100k</span>
        </div>
        
        <div className="flex flex-col">
          <p className="text-3xl font-bold">{formatCurrency(stats.currentBalance)}</p>
          <div className="flex items-center text-xs mt-1 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span>+{formatPercentage((stats.currentBalance - stats.initialBalance) / stats.initialBalance * 100)}</span>
          </div>
        </div>
        
        <div className="mt-4 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
            style={{ width: `${stats.progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-1">
          <p className="text-xs text-[var(--muted-text)]">{formatPercentage(stats.progressPercentage)}</p>
          <p className="text-xs text-[var(--muted-text)]">Meta: {formatCurrency(stats.targetBalance)}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
            <p className="text-xs text-[var(--muted-text)]">Faltam</p>
            <p className="text-base font-semibold">{formatCurrency(stats.targetBalance - stats.currentBalance)}</p>
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
            <p className="text-xs text-[var(--muted-text)]">Tempo estimado</p>
            <p className="text-base font-semibold">{stats.estimatedDaysLeft} dias</p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-3">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{stats.totalBets}</p>
              <p className="text-xs text-[var(--muted-text)]">Total apostas</p>
            </div>
          </div>
        </div>
        
        <div className="card p-3">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{stats.averageBetsPerDay.toFixed(1)}</p>
              <p className="text-xs text-[var(--muted-text)]">Média/Dia</p>
            </div>
          </div>
        </div>
        
        <div className="card p-3">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{stats.averageOdd.toFixed(2)}x</p>
              <p className="text-xs text-[var(--muted-text)]">Odd Média</p>
            </div>
          </div>
        </div>
        
        <div className="card p-3">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{stats.highestOdd.toFixed(2)}x</p>
              <p className="text-xs text-[var(--muted-text)]">Maior Odd</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold">Insights</h3>
          <div className="toggle-switch">
            <input type="checkbox" checked={showInsights} onChange={() => setShowInsights(!showInsights)} />
            <span className="toggle-slider"></span>
          </div>
        </div>

        {showInsights && (
          <div className="space-y-4">
            {/* Recomendações */}
            {analysis.hasTooManyDifficultBets && (
              <div className="p-3 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm text-red-400 font-medium">Muitas apostas difíceis ({formatPercentage(analysis.difficultBetsPercentage || 0)})</p>
                    <p className="text-xs text-[var(--muted-text)] mt-1">Diversifique com apostas de menor risco</p>
                  </div>
                </div>
              </div>
            )}

            {analysis.hasMultipleBetsInSameDay && (
              <div className="p-3 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)]">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-400 font-medium">Múltiplas apostas em {analysis.daysWithMultipleBets} {analysis.daysWithMultipleBets === 1 ? 'dia' : 'dias'}</p>
                    <p className="text-xs text-[var(--muted-text)] mt-1">Tente limitar a uma aposta por dia</p>
                  </div>
                </div>
              </div>
            )}

            {/* Gráfico de distribuição */}
            <div className="mt-3">
              <p className="text-xs text-[var(--muted-text)] mb-2">Distribuição por Dificuldade</p>
              <div className="space-y-2">
                {Object.entries(analysis.difficultyDistribution).map(([difficulty, count]) => {
                  const total = Object.values(analysis.difficultyDistribution).reduce((sum, c) => sum + c, 0);
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  
                  let bgColor, textColor;
                  switch(difficulty) {
                    case 'Fácil': bgColor = 'bg-green-500'; textColor = 'text-green-400'; break;
                    case 'Médio': bgColor = 'bg-yellow-500'; textColor = 'text-yellow-400'; break;
                    case 'Difícil': bgColor = 'bg-red-500'; textColor = 'text-red-400'; break;
                    default: bgColor = 'bg-gray-500'; textColor = 'text-gray-400';
                  }

                  return (
                    <div key={difficulty}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${bgColor} mr-1`}></div>
                          <span className={`text-xs ${textColor}`}>{difficulty}</span>
                        </div>
                        <span className="text-xs text-[var(--muted-text)]">{count} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${bgColor}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 