import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useGameStore } from '../../store/useGameStore';

export default function SettingsView() {
  const { theme, setTheme } = useThemeStore();
  const { playerName, setPlayerName } = useGameStore();
  
  const [nameInput, setNameInput] = useState(playerName || '');
  const [savedStatus, setSavedStatus] = useState(false);

  // Keep local input field synced if store value updates elsewhere
  useEffect(() => {
    setNameInput(playerName || '');
  }, [playerName]);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setPlayerName(nameInput);
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const themes = [
    { id: 'stoic', name: 'Stoic', tag: 'DARK VIOLET', bg: '#0d0d11', accent: '#a855f7' },
    { id: 'midnight', name: 'Midnight', tag: 'DEEP MONOCHROME', bg: '#050508', accent: '#38bdf8' },
    { id: 'cyan', name: 'Cyan', tag: 'DARK AQUA', bg: '#041316', accent: '#00bcd4' },
    { id: 'emerald', name: 'Emerald', tag: 'DARK GREEN', bg: '#06120e', accent: '#10b981' },
    { id: 'red', name: 'Red', tag: 'DARK CRIMSON', bg: '#14080a', accent: '#f43f5e' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 font-mono select-none space-y-8">
      {/* Page Title */}
      <div className="pb-4 border-b border-[var(--theme-border)]">
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Your setup.</h1>
      </div>

      {/* Player Name Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-serif font-bold text-white tracking-wide">Player name</h2>
        <p className="text-xs text-gray-400 font-serif">
          This name is your local identifier. No account or password is required.
        </p>

        <form onSubmit={handleSaveName} className="flex items-center space-x-3 pt-1">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter player name"
            className="w-full sm:w-96 px-4 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-md text-sm text-white focus:outline-none focus:border-[var(--theme-accent)] font-serif tracking-wide transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[var(--theme-accent)] text-black font-serif font-bold text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition cursor-pointer min-w-[100px] rounded-md shadow-md"
          >
            {savedStatus ? 'SAVED!' : 'SAVE'}
          </button>
        </form>
      </div>

      <div className="border-t border-[var(--theme-border)] pt-6"></div>

      {/* Theme Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-serif font-bold text-white tracking-wide">Theme</h2>
        <p className="text-xs text-gray-400 font-serif">
          Choose the atmosphere for your typing sessions. Your choice is saved on this device.
        </p>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative p-4 rounded-lg border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'border-[var(--theme-accent)] bg-[var(--theme-surface)] shadow-xl'
                    : 'border-[var(--theme-border)] bg-[var(--theme-surface)]/40 hover:border-gray-600 hover:bg-[var(--theme-surface-hover)]'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Swatch Preview Box */}
                  <div className="w-10 h-10 rounded flex overflow-hidden border border-white/10 shadow-inner">
                    <div className="w-1/2 h-full" style={{ backgroundColor: t.bg }} />
                    <div className="w-1/2 h-full" style={{ backgroundColor: t.accent }} />
                  </div>

                  {/* Theme Info */}
                  <div>
                    <p className="text-sm font-serif font-bold text-white">{t.name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-gray-400 font-sans mt-0.5">
                      {t.tag}
                    </p>
                  </div>
                </div>

                {/* Active Selection Indicator */}
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-accent)] shadow-sm"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
