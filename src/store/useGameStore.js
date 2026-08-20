import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // Player Identification State
  playerName: localStorage.getItem('flowtype-player-name') || '',

  // Navigation & Core Mode Selection
  mode: '60s', // '15s', '30s', '60s', '25 words', '50 words', 'daily', 'scorpion', 'overdrive', 'mirror'
  activeTab: 'typing', // 'home', 'typing', 'leaderboard', 'history', 'statistics', 'settings'

  // Standard Performance Telemetry
  wpm: 0,
  accuracy: 100,
  errors: 0,
  timeElapsed: 0,
  history: JSON.parse(localStorage.getItem('flowtype-history') || '[]'),
  dailyStreak: Number(localStorage.getItem('flowtype-streak') || 1),

  // --- SPECIAL MODES STATE ---
  
  // 1. Escape the Scorpion
  scorpionDistance: 78, // Distance in meters ahead of scorpion
  scorpionStatus: 'Start running', // 'Start running', 'SAFE DISTANCE', 'KEEP MOVING', 'DANGER', 'IT\'S RIGHT BEHIND YOU'
  isBitten: false,

  // 2. Overdrive Mode
  combo: 0,
  multiplier: 1.0,
  bestStreak: 0,
  overdriveScore: 0,

  // 3. Mirror Mode
  focusScore: 0,
  activeDisruption: null, // null | 'BLACKOUT' | 'GLITCH' | 'DECOY' | 'GHOST'
  disruptionLabel: 'CALM IS PART OF THE CHALLENGE.',

  // --- ACTIONS & MUTATORS ---
  
  // Player Name Action
  setPlayerName: (name) => {
    const trimmedName = name.trim();
    localStorage.setItem('flowtype-player-name', trimmedName);
    set({ playerName: trimmedName });
  },

  setMode: (mode) => {
    set({ mode });
    get().resetSpecialModes();
  },

  setActiveTab: (activeTab) => set({ activeTab }),

  // Telemetry updates
  setStats: (stats) => set((state) => ({ ...state, ...stats })),

  // 1. Scorpion Mode Actions
  updateScorpionDistance: (deltaMeters) => set((state) => {
    const newDistance = Math.max(0, state.scorpionDistance + deltaMeters);
    let status = 'SAFE DISTANCE';
    
    if (newDistance <= 0) {
      return { scorpionDistance: 0, isBitten: true, scorpionStatus: 'BITTEN!' };
    } else if (newDistance < 15) {
      status = "IT'S RIGHT BEHIND YOU";
    } else if (newDistance < 35) {
      status = 'DANGER';
    } else if (newDistance < 55) {
      status = 'KEEP MOVING';
    }

    return { scorpionDistance: newDistance, scorpionStatus: status };
  }),

  // 2. Overdrive Mode Actions
  incrementCombo: () => set((state) => {
    const newCombo = state.combo + 1;
    const newBest = Math.max(state.bestStreak, newCombo);
    // Multiplier steps up every 10 combo points
    const newMultiplier = Number((1.0 + Math.floor(newCombo / 10) * 0.5).toFixed(1));
    const addedScore = Math.round(10 * newMultiplier);

    return {
      combo: newCombo,
      bestStreak: newBest,
      multiplier: newMultiplier,
      overdriveScore: state.overdriveScore + addedScore
    };
  }),

  resetCombo: () => set({ combo: 0, multiplier: 1.0 }),

  // 3. Mirror Mode Actions
  triggerDisruption: (type, label) => set({
    activeDisruption: type,
    disruptionLabel: label || 'STAY FOCUSED'
  }),

  clearDisruption: () => set({
    activeDisruption: null,
    disruptionLabel: 'CALM IS PART OF THE CHALLENGE.'
  }),

  addFocusScore: (points) => set((state) => ({
    focusScore: state.focusScore + points
  })),

  // Reset all special mode counters for fresh runs
  resetSpecialModes: () => set({
    scorpionDistance: 78,
    scorpionStatus: 'Start running',
    isBitten: false,
    combo: 0,
    multiplier: 1.0,
    bestStreak: 0,
    overdriveScore: 0,
    focusScore: 0,
    activeDisruption: null,
    disruptionLabel: 'CALM IS PART OF THE CHALLENGE.'
  }),

  // History Management
  addHistoryRecord: (record) => set((state) => {
    const updated = [record, ...state.history];
    localStorage.setItem('flowtype-history', JSON.stringify(updated));
    return { history: updated };
  }),

  clearHistory: () => {
    localStorage.removeItem('flowtype-history');
    set({ history: [] });
  }
}));