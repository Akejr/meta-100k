import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface BetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onAddBet: (odd: number, team1?: string, team2?: string, difficulty?: 'Fácil' | 'Médio' | 'Difícil') => void;
}

const BetFormModal: React.FC<BetFormModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onAddBet,
}) => {
  const [odd, setOdd] = useState<string>('1.05');
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil'>('Médio');
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [oddSliderValue, setOddSliderValue] = useState<number>(0);
  const [isManualInput, setIsManualInput] = useState(false);
  
  const oddValue = parseFloat(odd);
  const potentialBalance = currentBalance ? currentBalance * oddValue : oddValue;
  const profit = potentialBalance - currentBalance;

  // Define constantes para cores e outras configurações
  const difficultyColors = {
    'Fácil': 'from-green-500 to-green-400 border-green-500/30 text-green-400',
    'Médio': 'from-yellow-500 to-yellow-400 border-yellow-500/30 text-yellow-400',
    'Difícil': 'from-red-500 to-red-400 border-red-500/30 text-red-400',
  };

  // Efeito para controlar a animação do modal e o overflow do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimating(true), 10);
      console.log('Modal aberto');
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 300);
      console.log('Modal fechado');
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Mapeamento do slider para valores de odd (apenas quando não estiver em modo de entrada manual)
  useEffect(() => {
    if (!isManualInput) {
      // Valores: 1.05, 1.10, 1.20, 1.30, 1.5, 1.7, 2.0, 2.5, 3.0, 4.0, 5.0
      const oddValues = [1.05, 1.10, 1.20, 1.30, 1.5, 1.7, 2.0, 2.5, 3.0, 4.0, 5.0];
      setOdd(oddValues[oddSliderValue].toFixed(2));
    }
  }, [oddSliderValue, isManualInput]);

  // Atualizar o slider quando o odd é alterado manualmente
  useEffect(() => {
    if (isManualInput) {
      const oddValues = [1.05, 1.10, 1.20, 1.30, 1.5, 1.7, 2.0, 2.5, 3.0, 4.0, 5.0];
      const closestIndex = oddValues.reduce((prev, curr, idx) => {
        return Math.abs(curr - oddValue) < Math.abs(oddValues[prev] - oddValue) ? idx : prev;
      }, 0);
      
      setOddSliderValue(closestIndex);
    }
  }, [odd, isManualInput, oddValue]);

  const handleOddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualInput(true);
    const value = e.target.value;
    
    // Permitir apenas números e um ponto decimal
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setOdd(value);
    }
  };

  const handleOddInputBlur = () => {
    // Validar e formatar a odd ao sair do campo
    let validOdd = parseFloat(odd);
    
    if (isNaN(validOdd) || validOdd < 1) {
      validOdd = 1.05;
    } else if (validOdd > 10) {
      validOdd = 10;
    }
    
    setOdd(validOdd.toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tentativa de envio do formulário');
    
    if (isNaN(oddValue) || oddValue <= 1) {
      setError('A odd deve ser maior que 1');
      return;
    }
    
    if (!team1.trim() || !team2.trim()) {
      setError('Por favor, preencha os times da partida');
      return;
    }
    
    try {
      console.log('Adicionando aposta:', { oddValue, team1, team2, difficulty });
      onAddBet(oddValue, team1, team2, difficulty);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Erro ao adicionar aposta:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro ao registrar a aposta');
      }
    }
  };

  const resetForm = () => {
    setOdd('1.05');
    setOddSliderValue(0);
    setTeam1('');
    setTeam2('');
    setDifficulty('Médio');
    setError(null);
    setIsManualInput(false);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(false);
    setTimeout(() => {
      resetForm();
      onClose();
    }, 300);
  };

  // Se o modal não estiver aberto, não renderize nada
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] px-4"
      onClick={handleCloseModal}
    >
      <div 
        className={`bg-gradient-to-b from-[#1e293b] to-[#172033] rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 transition-all duration-500 ${
          isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Nova Aposta</h2>
          </div>
          <button 
            onClick={handleCloseModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted-text)] hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status do Saldo - Card destacado */}
          <div className="glass-card p-4 rounded-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-[var(--muted-text)]">Saldo Atual</p>
                  <p className="text-2xl font-bold">{formatCurrency(currentBalance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--muted-text)]">Potencial</p>
                  <p className="text-2xl font-bold text-[var(--success)]">{formatCurrency(potentialBalance)}</p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-green-900/5 border border-green-500/20 flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium text-green-400">Lucro</span>
                </div>
                <span className="text-lg font-bold text-green-400">+{formatCurrency(profit)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-5">
            {/* ODD com slider e input */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold mb-4">Multiplicador (ODD)</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-32">
                    <input
                      type="text"
                      value={odd}
                      onChange={handleOddInputChange}
                      onBlur={handleOddInputBlur}
                      className="input text-4xl font-bold text-center"
                      placeholder="1.05"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-[var(--muted-text)]">x</span>
                  </div>
                  <div
                    onClick={() => setIsManualInput(!isManualInput)}
                    className={`py-1 px-3 rounded-full text-xs font-medium border cursor-pointer transition-all duration-200 ${
                      isManualInput 
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-500/30 text-blue-400'
                        : 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border-gray-500/30 text-gray-400'
                    }`}
                  >
                    {isManualInput ? 'Manual' : 'Slider'}
                  </div>
                </div>
                
                <div className="relative mt-4">
                  <input
                    type="range"
                    min="0" 
                    max="10"
                    value={oddSliderValue}
                    onChange={(e) => {
                      setIsManualInput(false);
                      setOddSliderValue(parseInt(e.target.value));
                    }}
                    className="w-full h-2 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${oddSliderValue * 10}%, var(--border-color) ${oddSliderValue * 10}%, var(--border-color) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-[var(--muted-text)] mt-2">
                    <span>Seguro</span>
                    <span>Médio</span>
                    <span>Arriscado</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seletor de Dificuldade */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold mb-4">Dificuldade da Aposta</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {(['Fácil', 'Médio', 'Difícil'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`p-3 rounded-xl border ${
                      difficulty === level 
                        ? `bg-gradient-to-r ${difficultyColors[level]} shadow-lg scale-105` 
                        : 'bg-[rgba(255,255,255,0.03)] border-[var(--border-color)] text-[var(--muted-text)]'
                    } transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)]`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {level === 'Fácil' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {level === 'Médio' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {level === 'Difícil' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                      <span>{level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Detalhes da Partida */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold mb-4">Detalhes da Partida</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="team1" className="block text-sm text-[var(--muted-text)] mb-1">
                      Time 1
                    </label>
                    <div className="relative">
                      <input
                        id="team1"
                        type="text"
                        className="input pl-9"
                        value={team1}
                        onChange={(e) => setTeam1(e.target.value)}
                        placeholder="Ex: Barcelona"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="team2" className="block text-sm text-[var(--muted-text)] mb-1">
                      Time 2
                    </label>
                    <div className="relative">
                      <input
                        id="team2"
                        type="text"
                        className="input pl-9"
                        value={team2}
                        onChange={(e) => setTeam2(e.target.value)}
                        placeholder="Ex: Real Madrid"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 flex items-start">
                <div className="p-1 rounded-full bg-red-500/20 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-400 font-medium">{error}</p>
                </div>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full py-4 px-6 rounded-xl font-bold text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300 group-hover:scale-105"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Registrar Aposta
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BetFormModal; 