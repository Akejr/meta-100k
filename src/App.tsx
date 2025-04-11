import React from 'react';
import { useBets } from './hooks/useBets';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BetHistory from './components/BetHistory';
import BottomMenu from './components/BottomMenu';
import './styles/globals.css';

function App() {
  const { 
    bets, 
    stats, 
    analysis, 
    activeTab, 
    setActiveTab,
    addBet, 
    removeBet 
  } = useBets();

  // Wrapper da função addBet para depuração
  const handleAddBet = (odd: number, team1?: string, team2?: string, difficulty?: 'Fácil' | 'Médio' | 'Difícil') => {
    console.log('App: Adicionando aposta', { odd, team1, team2, difficulty });
    addBet(odd, team1, team2, difficulty);
  };

  return (
    <Layout>
      {activeTab === 'dashboard' ? (
        <Dashboard stats={stats} analysis={analysis} />
      ) : (
        <BetHistory bets={bets} onRemoveBet={removeBet} />
      )}
      
      <BottomMenu 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentBalance={stats.currentBalance}
        onAddBet={handleAddBet}
      />
    </Layout>
  );
}

export default App; 