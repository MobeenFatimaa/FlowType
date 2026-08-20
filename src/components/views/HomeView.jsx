import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function HomeView() {
  const { setActiveTab, history } = useGameStore();

  const totalTests = history.length;
  const bestSpeed = totalTests > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgSpeed = totalTests > 0 ? Math.round(history.reduce((a, b) => a + b.wpm, 0) / totalTests) : 0;

  return (
    <div className="max-w-4xl mx-auto py-2 flex flex-col items-center justify-center text-center font-mono select-none space-y-6">
      {/* Top Header Tagline */}
      <div className="w-full flex justify-between items-center text-[10px] tracking-widest text-gray-500 uppercase">
        <span>FLOWTYPE</span>
        <span>PRECISION / SPEED / FLOW</span>
      </div>

      {/* Hero Headline Section */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center justify-center space-x-3 text-xs tracking-widest text-gray-400 uppercase">
          <span className="w-8 h-[1px] bg-[var(--theme-border)]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"></span>
          <span className="w-8 h-[1px] bg-[var(--theme-border)]"></span>
        </div>

        {/* Pixel Headline */}
        <h1 
          className="text-4xl sm:text-6xl font-black text-white tracking-wider leading-tight"
          style={{ fontFamily: '"Press Start 2P", monospace, system-ui' }}
        >
          Welcome to <br />
          <span className="text-[var(--theme-accent)]">FlowType</span>
        </h1>

        <p className="text-sm text-gray-400 font-serif italic max-w-lg mx-auto leading-relaxed">
          Test your typing speed, sharpen your accuracy, and find your rhythm. A focused space for measurable progress.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setActiveTab('typing')}
          className="flex items-center space-x-3 px-8 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-gray-200 transition-all shadow-lg hover:scale-[1.02]"
        >
          <span>Start Typing</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveTab('statistics')}
          className="flex items-center space-x-3 px-8 py-3 bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-white font-semibold text-xs tracking-widest uppercase rounded-lg transition-all hover:border-gray-500"
        >
          <span>View Statistics</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Interactive Telemetry Cards with Hover Animation */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="relative group bg-[var(--theme-surface)]/40 hover:bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-b-2 hover:border-b-white rounded-lg py-5 px-4 transition-all duration-200 cursor-pointer -translate-y-0 hover:-translate-y-1 shadow-none hover:shadow-lg">
          <div className="space-y-1">
            <p className="text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-gray-300 transition-colors">
              Best WPM
            </p>
            <p className="text-2xl font-bold text-white">
              {bestSpeed}
            </p>
          </div>
        </div>

        <div className="relative group bg-[var(--theme-surface)]/40 hover:bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-b-2 hover:border-b-white rounded-lg py-5 px-4 transition-all duration-200 cursor-pointer -translate-y-0 hover:-translate-y-1 shadow-none hover:shadow-lg">
          <div className="space-y-1">
            <p className="text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-gray-300 transition-colors">
              Average WPM
            </p>
            <p className="text-2xl font-bold text-white">
              {avgSpeed}
            </p>
          </div>
        </div>

        <div className="relative group bg-[var(--theme-surface)]/40 hover:bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-b-2 hover:border-b-white rounded-lg py-5 px-4 transition-all duration-200 cursor-pointer -translate-y-0 hover:-translate-y-1 shadow-none hover:shadow-lg">
          <div className="space-y-1">
            <p className="text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-gray-300 transition-colors">
              Tests Completed
            </p>
            <p className="text-2xl font-bold text-white">
              {totalTests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}