import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

interface BetFormProps {
  currentBalance: number;
  onAddBet: (odd: number) => void;
}

export const BetForm: React.FC<BetFormProps> = ({
  currentBalance,
  onAddBet,
}) => {
  const [odd, setOdd] = useState<string>('1.05');
  const [error, setError] = useState<string | null>(null);
  
  const oddValue = parseFloat(odd);
  const potentialBalance = currentBalance ? currentBalance * oddValue : oddValue;
  const profit = potentialBalance - currentBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNaN(oddValue) || oddValue <= 1) {
      setError('A odd deve ser maior que 1');
      return;
    }
    
    try {
      onAddBet(oddValue);
      setOdd('1.05'); // Reset para o valor padrão
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro ao registrar a aposta');
      }
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Registrar Aposta</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="odd" className="block text-sm text-[var(--muted-text)] mb-1">
            ODD da aposta
          </label>
          <input
            id="odd"
            type="number"
            min="1.01"
            step="0.01"
            className="input"
            value={odd}
            onChange={(e) => {
              setOdd(e.target.value);
              setError(null);
            }}
          />
          {error && <p className="text-[var(--error)] text-sm mt-1">{error}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4 my-5">
          <div>
            <p className="text-sm text-[var(--muted-text)]">Saldo Atual</p>
            <p className="text-xl">{formatCurrency(currentBalance)}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--muted-text)]">Potencial Saldo</p>
            <p className="text-xl text-[var(--success)]">{formatCurrency(potentialBalance)}</p>
          </div>
        </div>
        
        <p className="text-center mb-4 text-[var(--success)]">
          +{formatCurrency(profit)}
        </p>
        
        <button type="submit" className="btn-primary">
          Registrar Aposta
        </button>
      </form>
    </div>
  );
}; 