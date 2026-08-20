import React from 'react';
import { Clock, Type, Sparkles, Flame, Zap, ShieldAlert } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function ModeSelector() {
  const { mode, setMode } = useGameStore();

  const timeModes = ['15s', '30s', '60s'];
  const wordModes = ['25 words', '50 words'];
  
  // Specific icons for special game modes
  const specialModeConfig = [
    { name: 'Daily', icon: Sparkles },
    { name: 'Escape the Scorpion', icon: Flame },
    { name: 'Overdrive', icon: Zap },
    { name: 'Mirror', icon: ShieldAlert }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl font-mono text-xs">
      {/* Time Modes */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-[var(--theme-surface-hover)] rounded-xl border border-[var(--theme-border)]">
        <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
        {timeModes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === m
                ? 'bg-[var(--theme-accent)] text-white font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Word Modes */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-[var(--theme-surface-hover)] rounded-xl border border-[var(--theme-border)]">
        <Type className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
        {wordModes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === m
                ? 'bg-[var(--theme-accent)] text-white font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Special Modes */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-[var(--theme-surface-hover)] rounded-xl border border-[var(--theme-border)]">
        {specialModeConfig.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setMode(name)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
              mode === name
                ? 'bg-[var(--theme-accent)] text-white font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${mode === name ? 'text-white' : 'text-[var(--theme-accent)]'}`} />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}