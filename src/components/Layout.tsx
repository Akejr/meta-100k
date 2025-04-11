import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-blue-600/10 filter blur-3xl"></div>
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-indigo-600/10 filter blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/5 filter blur-3xl"></div>
      </div>

      {/* Container para conteúdo com largura máxima */}
      <div className="relative max-w-lg mx-auto px-4 flex flex-col min-h-screen pb-16">
        {/* Header */}
        <header className="relative z-10 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center mr-3 shadow-lg">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <h1 className="text-lg font-bold">Meta 100k</h1>
          </div>
          <div className="flex space-x-2">
            <button 
              className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--muted-text)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              aria-label="Configurações"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--muted-text)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Menu dropdown */}
        {menuOpen && (
          <div className="absolute top-20 right-4 w-64 rounded-2xl bg-[rgba(20,20,30,0.95)] border border-[rgba(255,255,255,0.1)] shadow-xl z-20 overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                  <span className="font-bold text-white">EC</span>
                </div>
                <div>
                  <p className="font-medium">Evandro Casanova</p>
                  <p className="text-xs text-[var(--muted-text)]">Apostador Profissional</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Histórico de Apostas</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Nova Aposta</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <span>Estatísticas</span>
                  </a>
                </li>
              </ul>
            </nav>
            
            <div className="p-2 border-t border-[rgba(255,255,255,0.1)]">
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sair</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Overlay para fechar o menu ao clicar fora */}
        {menuOpen && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main content com scroll independente */}
        <main className="relative z-5 flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 