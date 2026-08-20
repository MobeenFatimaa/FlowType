import React from 'react';
import { History, Trophy, Zap, Target } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function HistoryView() {
  const { history } = useGameStore();

  const totalTests = history.length;
  const avgWpm = totalTests > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.wpm, 0) / totalTests) 
    : 0;
  const avgAccuracy = totalTests > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.accuracy, 0) / totalTests) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono select-none">
      {/* View Header */}
      <div className="pb-2 border-b border-[var(--theme-border)]">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <History className="w-5 h-5 text-[var(--theme-accent)]" />
          <span>Test History</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">Review your recent typing performance and progress</p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-[var(--theme-surface-hover)] rounded-lg text-[var(--theme-accent)]">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Tests</p>
            <p className="text-xl font-bold text-white">{totalTests}</p>
          </div>
        </div>

        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-[var(--theme-surface-hover)] rounded-lg text-[var(--theme-accent)]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Average WPM</p>
            <p className="text-xl font-bold text-white">{avgWpm}</p>
          </div>
        </div>

        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-[var(--theme-surface-hover)] rounded-lg text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Average Accuracy</p>
            <p className="text-xl font-bold text-white">{avgAccuracy}%</p>
          </div>
        </div>
      </div>

      {/* History Log / Table */}
      <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl overflow-hidden">
        {history.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-gray-300">No tests recorded yet.</p>
            <p className="text-xs text-gray-500">Complete a typing session to see your stats logged here.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--theme-surface-hover)] border-b border-[var(--theme-border)] text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Speed</th>
                <th className="py-3 px-4">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--theme-border)] text-gray-300">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-[var(--theme-surface-hover)]/50 transition">
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4 text-[var(--theme-accent)] font-semibold">{record.mode}</td>
                  <td className="py-3 px-4 font-bold text-white">{record.wpm} WPM</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{record.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}