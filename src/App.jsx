import React, { useEffect } from 'react';
import Sidebar from './components/common/Sidebar';
import NameModal from './components/common/NameModal';
import ModeSelector from './components/game/ModeSelector';
import TypingEngine from './components/game/TypingEngine';
import HomeView from './components/views/HomeView';
import HistoryView from './components/views/HistoryView';
import SettingsView from './components/views/SettingsView';
import LeaderboardView from './components/views/LeaderboardView';
import StatisticsView from './components/views/StatisticsView';
import { useThemeStore } from './store/useThemeStore';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const { initTheme } = useThemeStore();
  const { activeTab } = useGameStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="flex min-h-screen bg-[var(--theme-bg)] text-white transition-colors duration-200">
      {/* Onboarding Name Modal - Connected from src/components/common/NameModal.jsx */}
      <NameModal />

      <Sidebar />

      <main className="flex-1 p-10 flex flex-col justify-between">
        <div className="space-y-8 max-w-4xl mx-auto w-full">
          {activeTab === 'typing' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-bold italic tracking-wide">Focus.</h2>
              </div>
              <ModeSelector />
            </div>
          )}

          <div className="py-4">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'typing' && <TypingEngine />}
            {activeTab === 'leaderboard' && <LeaderboardView />}
            {activeTab === 'statistics' && <StatisticsView />}
            {activeTab === 'history' && <HistoryView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
}