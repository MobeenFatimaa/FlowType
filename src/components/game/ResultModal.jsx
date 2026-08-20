import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, BarChart2, CheckCircle, XCircle, Flame, Eye, Skull } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function ResultModal({ isOpen, stats, onRestart }) {
  const { isBitten, scorpionDistance, overdriveScore, bestStreak, focusScore } = useGameStore();

  if (!isOpen) return null;

  const isScorpionMode = stats.mode === 'Escape the Scorpion';
  const isOverdriveMode = stats.mode === 'Overdrive';
  const isMirrorMode = stats.mode === 'Mirror';

  useEffect(() => {
    // Trigger celebratory confetti effect if accuracy >= 90% and not bitten by scorpion
    if (stats.accuracy >= 90 && !isBitten) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, stats.accuracy, isBitten]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#13131a] border border-[#232330] rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl font-mono animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
            isBitten 
              ? 'bg-red-500/10 text-red-500' 
              : 'bg-purple-500/10 text-purple-400'
          }`}>
            {isBitten ? <Skull className="w-6 h-6 animate-pulse" /> : <Trophy className="w-6 h-6" />}
          </div>

          <h3 className="text-xl font-bold text-white tracking-wide">
            {isBitten ? 'You got bitten by scorpion..' : 'Test Completed!'}
          </h3>
          <p className="text-xs text-gray-400">Mode: <span className="text-purple-400 font-semibold">{stats.mode}</span></p>
        </div>

        {/* Mode-Specific Telemetry Visualizer */}
        {isScorpionMode && (
          <div className={`p-4 rounded-xl border text-center ${
            isBitten ? 'bg-red-950/30 border-red-800 text-red-300' : 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
          }`}>
            <p className="text-xs font-semibold uppercase tracking-wider">Scorpion Distance</p>
            <p className="text-3xl font-extrabold mt-1">{Math.round(scorpionDistance)}m</p>
            <p className="text-[10px] opacity-80 mt-1">
              {isBitten ? 'Caught before reaching safety!' : 'Maintained safe runner distance!'}
            </p>
          </div>
        )}

        {isOverdriveMode && (
          <div className="grid grid-cols-2 gap-3 bg-amber-950/20 border border-amber-800/40 p-4 rounded-xl text-center">
            <div>
              <p className="text-[10px] text-amber-400/80 font-bold">OVERDRIVE SCORE</p>
              <p className="text-2xl font-black text-amber-400">{overdriveScore}</p>
            </div>
            <div>
              <p className="text-[10px] text-amber-400/80 font-bold">BEST STREAK</p>
              <p className="text-2xl font-black text-white">{bestStreak}x</p>
            </div>
          </div>
        )}

        {isMirrorMode && (
          <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center space-x-2 text-purple-300 text-xs font-bold mb-1">
              <Eye className="w-4 h-4" />
              <span>TOTAL FOCUS SCORE</span>
            </div>
            <p className="text-3xl font-black text-purple-400">{focusScore}</p>
          </div>
        )}

        {/* Primary Standard Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#181824] border border-[#232330] p-4 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">SPEED</p>
            <p className="text-3xl font-bold text-purple-400">{stats.wpm}</p>
            <p className="text-[10px] text-gray-400 mt-1">Words Per Min</p>
          </div>

          <div className="bg-[#181824] border border-[#232330] p-4 rounded-xl text-center">
            <p className="text-xs text-gray-500 mb-1">ACCURACY</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.accuracy}%</p>
            <p className="text-[10px] text-gray-400 mt-1">Key Precision</p>
          </div>
        </div>

        {/* Character Detailed Breakdown */}
        <div className="bg-[#181824]/60 border border-[#232330] p-4 rounded-xl space-y-2 text-xs">
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Correct Characters</span>
            </span>
            <span className="font-bold text-white">{stats.correctChars}</span>
          </div>

          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center space-x-1.5">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Incorrect Characters</span>
            </span>
            <span className="font-bold text-white">{stats.incorrectChars}</span>
          </div>

          <div className="flex justify-between items-center text-gray-300 pt-2 border-t border-[#232330]">
            <span className="flex items-center space-x-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Raw Speed</span>
            </span>
            <span className="font-bold text-white">{stats.rawWpm} WPM</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-xs tracking-wide transition shadow-lg shadow-purple-900/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>

      </div>
    </div>
  );
}