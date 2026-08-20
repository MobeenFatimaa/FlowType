import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { User, Sparkles, Keyboard, ArrowRight } from 'lucide-react';

export default function NameModal() {
  const { playerName, setPlayerName } = useGameStore();
  const [inputName, setInputName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal if playerName is missing, empty, or whitespace-only
    if (!playerName || playerName.trim() === '') {
      setIsOpen(true);
    } else {
      setInputName(playerName);
      setIsOpen(false);
    }
  }, [playerName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-mono select-none animate-fadeIn">
      <div className="relative bg-[var(--theme-surface,#121212)] border border-[var(--theme-border,#2a2a2a)] p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6 transform transition-all animate-scaleUp">
        
        {/* Header Icon & Title */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[var(--theme-accent,#e2b714)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase opacity-80">Welcome To FlowType</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Claim Your Alias
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Enter your racer handle to track your statistics, outrun the scorpion, and display your scores on the global leaderboard.
          </p>
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g. Mobeen Fatima"
              maxLength={20}
              autoFocus
              className="w-full bg-black/50 border border-[var(--theme-border,#333)] rounded-xl py-3.5 pl-11 pr-4 text-white text-sm font-semibold placeholder-gray-600 focus:outline-none focus:border-[var(--theme-accent,#e2b714)] transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={!inputName.trim()}
            className="w-full py-3.5 bg-white hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
          >
            <span>Start Typing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Modal Footer Note */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-semibold">
          <span className="flex items-center space-x-1">
            <Keyboard className="w-3.5 h-3.5" />
            <span>Local Identifier</span>
          </span>
          <span>You can change this anytime in Settings</span>
        </div>
      </div>
    </div>
  );
}