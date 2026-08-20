import React from 'react';
import { BarChart3, Flame, Zap, Target, Activity } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function StatisticsView() {
  const { history } = useGameStore();

  const totalTests = history.length;
  const bestSpeed = totalTests > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgSpeed = totalTests > 0 ? Math.round(history.reduce((a, b) => a + b.wpm, 0) / totalTests) : 0;
  const avgAccuracy = totalTests > 0 ? Math.round(history.reduce((a, b) => a + b.accuracy, 0) / totalTests) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono select-none">
      {/* Header */}
      <div className="pb-2 border-b border-[var(--theme-border)]">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-[var(--theme-accent)]" />
          <span>Performance Analytics</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">Deep insights on speed progression and accuracy</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>Best Speed</span>
          </div>
          <p className="text-2xl font-bold text-white">{bestSpeed} <span className="text-xs font-normal text-gray-400">WPM</span></p>
        </div>

        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Average Speed</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgSpeed} <span className="text-xs font-normal text-gray-400">WPM</span></p>
        </div>

        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgAccuracy}%</p>
        </div>

        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Tests Logged</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalTests}</p>
        </div>
      </div>
    </div>
  );
}