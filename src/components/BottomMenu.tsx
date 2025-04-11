import React, { useState } from 'react';
import BetFormModal from './BetFormModal';

interface BottomMenuProps {
  activeTab: 'dashboard' | 'history';
  onTabChange: (tab: 'dashboard' | 'history') => void;
  currentBalance: number;
  onAddBet: (odd: number, team1?: string, team2?: string, difficulty?: 'Fácil' | 'Médio' | 'Difícil') => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  activeTab,
  onTabChange,
  currentBalance,
  onAddBet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleOpenModal = () => {
    console.log('Abrindo modal de apostas');
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Menu de navegação principal */}
      <div className="fixed bottom-5 left-0 right-0 z-40 px-4">
        {/* Barra de navegação inferior */}
        <nav className="max-w-lg mx-auto h-16 bg-[rgba(20,20,30,0.85)] backdrop-blur-lg rounded-2xl shadow-xl border border-[rgba(255,255,255,0.1)] flex items-center justify-between px-8 relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 opacity-50"></div>
          
          {/* Botão Dashboard */}
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`relative flex flex-col items-center py-1 px-6 transition-all duration-300`}
            onMouseEnter={() => setHoveredButton('dashboard')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Dashboard"
          >
            {activeTab === 'dashboard' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)] animate-pulse"></div>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-gray-400'} transition-colors duration-300`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`text-xs mt-1 ${activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : 'text-gray-400'} transition-colors duration-300`}>Dashboard</span>
            
            {(activeTab === 'dashboard' || hoveredButton === 'dashboard') && (
              <div className="absolute -inset-1 bg-blue-500/10 rounded-xl -z-10"></div>
            )}
          </button>
          
          {/* Botão + flutuante */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={handleOpenModal}
              className="group w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 border border-blue-500/30"
              aria-label="Adicionar aposta"
              type="button"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-60 duration-1000"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/80 to-indigo-700/80 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white relative z-10 transition-transform duration-300 group-hover:rotate-90" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Botão Histórico */}
          <button 
            onClick={() => onTabChange('history')}
            className={`relative flex flex-col items-center py-1 px-6 transition-all duration-300`}
            onMouseEnter={() => setHoveredButton('history')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Histórico"
          >
            {activeTab === 'history' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.7)] animate-pulse"></div>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${activeTab === 'history' ? 'text-purple-400' : 'text-gray-400'} transition-colors duration-300`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-xs mt-1 ${activeTab === 'history' ? 'text-purple-400 font-semibold' : 'text-gray-400'} transition-colors duration-300`}>Histórico</span>
            
            {(activeTab === 'history' || hoveredButton === 'history') && (
              <div className="absolute -inset-1 bg-purple-500/10 rounded-xl -z-10"></div>
            )}
          </button>
        </nav>
      </div>

      {/* Modal para adicionar aposta */}
      <BetFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentBalance={currentBalance}
        onAddBet={onAddBet}
      />
    </>
  );
};

export default BottomMenu; 