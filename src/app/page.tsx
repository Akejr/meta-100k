'use client';

import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import BetHistory from '@/components/BetHistory';
import BottomMenu from '@/components/BottomMenu';
import { useBets } from '@/hooks/useBets';

export default function Home() {
  const { bets, stats, analysis, activeTab, setActiveTab, addBet, removeBet, resetBets } = useBets();

  return (
    <div className="app-container">
      <main className="min-h-screen flex flex-col">
        <Header onReset={resetBets} />
        
        <div className="p-4 max-w-md mx-auto w-full flex-1 content-wrapper">
          {activeTab === 'dashboard' ? (
            <Dashboard stats={stats} analysis={analysis} />
          ) : (
            <BetHistory bets={bets} onRemoveBet={removeBet} />
          )}
        </div>
        
        <BottomMenu 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentBalance={stats.currentBalance}
          onAddBet={addBet}
        />
      </main>
    </div>
  );
}
