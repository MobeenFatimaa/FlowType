import React from 'react';
import { Trophy, Flame } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function LeaderboardView() {
  const { playerName } = useGameStore();
  const displayName = playerName || 'Anonymous';

  const leaders = [
    { rank: 1, name: displayName, speed: 142, accuracy: 99, mode: '60s' },
    { rank: 2, name: 'Alex Chen', speed: 138, accuracy: 98, mode: '60s' },
    { rank: 3, name: 'Sarah Jenkins', speed: 125, accuracy: 97, mode: '60s' },
    { rank: 4, name: 'David Kim', speed: 118, accuracy: 96, mode: '60s' },
    { rank: 5, name: 'Elena Rostova', speed: 112, accuracy: 95, mode: '60s' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono select-none">
      {/* Header */}
      <div className="pb-2 border-b border-[var(--theme-border)]">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-[var(--theme-accent)]" />
          <span>Global Leaderboard</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">Top speed typists in the FlowType community</p>
      </div>

      {/* Table Container */}
      <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--theme-surface-hover)] border-b border-[var(--theme-border)] text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Rank</th>
              <th className="py-3.5 px-6">Typist</th>
              <th className="py-3.5 px-6">Speed</th>
              <th className="py-3.5 px-6">Accuracy</th>
              <th className="py-3.5 px-6">Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--theme-border)] text-gray-300">
            {leaders.map((leader) => (
              <tr key={leader.rank} className="hover:bg-[var(--theme-surface-hover)]/50 transition">
                <td className="py-4 px-6 font-bold flex items-center space-x-2">
                  {leader.rank === 1 && <Trophy className="w-4 h-4 text-amber-400" />}
                  {leader.rank === 2 && <Trophy className="w-4 h-4 text-gray-300" />}
                  {leader.rank === 3 && <Trophy className="w-4 h-4 text-amber-600" />}
                  <span>#{leader.rank}</span>
                </td>
                <td className="py-4 px-6 font-semibold text-white">{leader.name}</td>
                <td className="py-4 px-6 text-[var(--theme-accent)] font-bold">
                  <span className="inline-flex items-center space-x-1">
                    <span>{leader.speed} WPM</span>
                    {leader.rank === 1 && <Flame className="w-3.5 h-3.5 text-[var(--theme-accent)]" />}
                  </span>
                </td>
                <td className="py-4 px-6 text-emerald-400 font-semibold">{leader.accuracy}%</td>
                <td className="py-4 px-6 text-gray-400">{leader.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}