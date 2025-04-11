import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="py-4 px-4 border-b border-[var(--border-color)] flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Meta 100k</h1>
        <p className="text-sm text-[var(--muted-text)]">
          Rumo à meta com estratégia
        </p>
      </div>
      
      <button
        onClick={() => {
          if (window.confirm('Tem certeza que deseja resetar todas as apostas? Esta ação não pode ser desfeita.')) {
            onReset();
          }
        }}
        className="text-[var(--error)] hover:underline text-sm"
      >
        Resetar
      </button>
    </header>
  );
};

export default Header; 