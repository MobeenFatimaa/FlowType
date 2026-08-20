import React from 'react';
import { Home, Keyboard, Trophy, History, BarChart3, Settings, Globe } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useGameStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'typing', label: 'Typing', icon: Keyboard },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'history', label: 'History', icon: History },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[var(--theme-surface)] border-r border-[var(--theme-border)] flex flex-col justify-between p-6 select-none font-mono transition-colors duration-200">
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tight text-white">FlowType</span>
          </div>
          <p className="text-[10px] tracking-widest uppercase text-gray-500 font-semibold">
            PRECISION / SPEED / FLOW
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--theme-surface-hover)] text-white border border-[var(--theme-border)] shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-[var(--theme-surface-hover)]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--theme-accent)]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="space-y-4 pt-6 border-t border-[var(--theme-border)] text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {/* Custom GitHub Waving Octocat Icon */}
          <a
            href="https://github.com/MobeenFatimaa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Custom Minimal LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/mobeen-fatima-599a35347/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
          </a>

          <a href="#" className="hover:text-white transition flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </a>
        </div>

        <div className="text-[10px] space-y-0.5">
          <p>
            Developed by:{' '}
            <span className="text-[var(--theme-accent)] font-semibold">Mobeen Fatima</span>
          </p>
          <p className="text-gray-600">v0.1.0</p>
        </div>
      </div>
    </aside>
  );
}