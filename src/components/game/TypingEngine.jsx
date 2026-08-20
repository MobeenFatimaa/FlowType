import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Zap, Target, ShieldAlert, EyeOff, Flame, Skull, Shield, FastForward, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { generateWordBuffer } from '../../data/wordLists';
import ResultModal from './ResultModal';

export default function TypingEngine() {
  const store = useGameStore();

  const { 
    mode = '', 
    addHistoryRecord,
    scorpionDistance = 100,
    scorpionStatus = 'SAFE',
    isBitten = false,
    updateScorpionDistance,
    combo = 0,
    multiplier = 1,
    overdriveScore = 0,
    incrementCombo,
    resetCombo,
    focusScore = 0,
    activeDisruption = null,
    disruptionLabel = '',
    triggerDisruption,
    clearDisruption,
    addFocusScore,
    resetSpecialModes
  } = store || {};

  const [textBuffer, setTextBuffer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Scorpion FX States
  const [scorpionActionText, setScorpionActionText] = useState('TYPE ACCURATELY TO OUTRUN THE CHASE');
  const [isGainingGround, setIsGainingGround] = useState(false);
  const [screenRedAlert, setScreenRedAlert] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const scorpionTimerRef = useRef(null);
  const mirrorTimerRef = useRef(null);
  const disruptionTimeoutRef = useRef(null);

  const isWordMode = mode.includes('words');
  const isScorpionMode = mode === 'Escape the Scorpion';
  const isOverdriveMode = mode === 'Overdrive';
  const isMirrorMode = mode === 'Mirror';

  const getInitialTime = () => {
    if (mode === '15s') return 15;
    if (mode === '30s') return 30;
    return 60;
  };

  const getTargetWordCount = () => {
    if (mode === '25 words') return 25;
    if (mode === '50 words') return 50;
    return 60;
  };

  const initTest = () => {
    const initialTime = getInitialTime();
    setTimer(initialTime);
    setTextBuffer(generateWordBuffer ? generateWordBuffer(isWordMode ? getTargetWordCount() : 80) : 'default test buffer');
    setUserInput('');
    setIsActive(false);
    setIsCompleted(false);
    setWpm(0);
    setAccuracy(100);
    setCorrectCount(0);
    setIncorrectCount(0);
    setScorpionActionText('TYPE ACCURATELY TO OUTRUN THE CHASE');
    setScreenRedAlert(false);
    
    if (resetSpecialModes) resetSpecialModes();

    if (timerRef.current) clearInterval(timerRef.current);
    if (scorpionTimerRef.current) clearInterval(scorpionTimerRef.current);
    if (mirrorTimerRef.current) clearInterval(mirrorTimerRef.current);
    if (disruptionTimeoutRef.current) clearTimeout(disruptionTimeoutRef.current);
  };

  useEffect(() => {
    initTest();
  }, [mode]);

  // Standard Timer Loop
  useEffect(() => {
    if (isActive && !isWordMode && !isScorpionMode && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isActive && !isWordMode && !isScorpionMode) {
      finishTest();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timer, isWordMode, isScorpionMode]);

  // Dynamic Scorpion Crawl Engine
  useEffect(() => {
    if (isActive && isScorpionMode && !isCompleted) {
      scorpionTimerRef.current = setInterval(() => {
        if (updateScorpionDistance) {
          updateScorpionDistance(-3.0); // Constant scorpion velocity
          
          if (scorpionDistance < 35) {
            setScreenRedAlert(true);
            setScorpionActionText('🚨 CRITICAL DANGER: SCORPION IS LUNGING!');
          } else {
            setScreenRedAlert(false);
          }
        }
      }, 800);
    }
    return () => clearInterval(scorpionTimerRef.current);
  }, [isActive, isScorpionMode, isCompleted, scorpionDistance]);

  useEffect(() => {
    if (isScorpionMode && isBitten && isActive) {
      finishTest();
    }
  }, [isBitten, isScorpionMode, isActive]);

  // Mirror Mode Engine
  useEffect(() => {
    if (isActive && isMirrorMode && !isCompleted) {
      mirrorTimerRef.current = setInterval(() => {
        const disruptions = [
          { type: 'MIRROR_FLIP', label: 'MIRROR FLIP ACTIVE (4s)' },
          { type: 'BLACKOUT', label: 'BLACKOUT! TYPE FROM MEMORY (4s)' },
          { type: 'GLITCH', label: 'GLITCH IN THE SYSTEM (4s)' }
        ];

        const selected = disruptions[Math.floor(Math.random() * disruptions.length)];
        if (triggerDisruption) triggerDisruption(selected.type, selected.label);

        if (disruptionTimeoutRef.current) clearTimeout(disruptionTimeoutRef.current);
        disruptionTimeoutRef.current = setTimeout(() => {
          if (clearDisruption) clearDisruption();
        }, 4000);
      }, 12000);
    }

    return () => {
      clearInterval(mirrorTimerRef.current);
      if (disruptionTimeoutRef.current) clearTimeout(disruptionTimeoutRef.current);
    };
  }, [isActive, isMirrorMode, isCompleted]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    const lastTypedChar = value[value.length - 1];
    const targetChar = textBuffer[value.length - 1];

    if (value.length > userInput.length) {
      if (lastTypedChar === targetChar) {
        if (isOverdriveMode && incrementCombo) requestAnimationFrame(() => incrementCombo());
        if (isMirrorMode && addFocusScore) requestAnimationFrame(() => addFocusScore(15));
        
        if (isScorpionMode && updateScorpionDistance) {
          requestAnimationFrame(() => updateScorpionDistance(1.2)); // Rapid burst on correct key
          setIsGainingGround(true);
          setScorpionActionText('⚡ NITRO BOOST! +1.2m GAINED');
          setTimeout(() => setIsGainingGround(false), 250);
        }
      } else {
        if (isOverdriveMode && resetCombo) requestAnimationFrame(() => resetCombo());
        if (isScorpionMode) {
          setScorpionActionText('💥 TYPO STUMBLED! SCORPION CLOSES IN');
        }
      }
    }

    setUserInput(value);

    let correctChars = 0;
    let incorrectChars = 0;

    for (let i = 0; i < value.length; i++) {
      if (value[i] === textBuffer[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }

    setCorrectCount(correctChars);
    setIncorrectCount(incorrectChars);

    const currentAccuracy = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    const timeSpent = isWordMode ? 1 : (getInitialTime() - timer || 1);
    const elapsedMinutes = timeSpent / 60;
    const currentWpm = Math.round((correctChars / 5) / elapsedMinutes);
    setWpm(currentWpm > 0 ? currentWpm : 0);

    if (value.length >= textBuffer.length) {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsActive(false);
    setIsCompleted(true);

    if (timerRef.current) clearInterval(timerRef.current);
    if (scorpionTimerRef.current) clearInterval(scorpionTimerRef.current);
    if (mirrorTimerRef.current) clearInterval(mirrorTimerRef.current);
    if (disruptionTimeoutRef.current) clearTimeout(disruptionTimeoutRef.current);

    setTimeout(() => {
      if (addHistoryRecord) {
        addHistoryRecord({
          id: Date.now(),
          mode,
          wpm: wpm || 0,
          accuracy: accuracy || 100,
          correctChars: correctCount,
          incorrectChars: incorrectCount,
          overdriveScore: isOverdriveMode ? overdriveScore : undefined,
          focusScore: isMirrorMode ? focusScore : undefined,
          scorpionDistance: isScorpionMode ? Math.round(scorpionDistance) : undefined,
          date: new Date().toLocaleDateString(),
        });
      }
    }, 0);
  };

  // Math calculations for dynamic positioning on track
  const currentGap = Math.min(100, Math.max(0, scorpionDistance || 0));
  const runnerPosPercent = 88; 
  const scorpionPosPercent = Math.max(2, runnerPosPercent - currentGap * 0.82);

  return (
    <div className={`max-w-3xl mx-auto space-y-6 font-mono select-none transition-all duration-300 ${
      screenRedAlert ? 'ring-4 ring-red-600/50 rounded-2xl bg-red-950/10' : ''
    }`}>
      
      {/* 🦂 HIGH-ACTION SCORPION CHASE ARENA */}
      {isScorpionMode && (
        <div className={`relative border p-5 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden ${
          scorpionDistance < 30 
            ? 'border-red-500 bg-gradient-to-b from-red-950/40 via-gray-900 to-black shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
            : 'border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-gray-900 to-black shadow-[0_0_20px_rgba(245,158,11,0.15)]'
        }`}>
          
          {/* Danger Radar Background Pulse */}
          {scorpionDistance < 35 && (
            <div className="absolute inset-0 bg-red-600/10 animate-ping pointer-events-none" />
          )}

          {/* Top Status Telemetry */}
          <div className="relative z-10 flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              {scorpionDistance < 30 ? (
                <div className="flex items-center space-x-2 text-red-500 animate-pulse font-black">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                  <span className="text-xs uppercase tracking-widest">DANGER ZONE</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-emerald-400 font-black">
                  <Shield className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest">{scorpionStatus || 'SAFE DISTANCE'}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
              <FastForward className={`w-4 h-4 ${isGainingGround ? 'text-emerald-400 scale-125' : 'text-gray-400'} transition-transform`} />
              <span className="text-xs font-bold text-gray-400">
                GAP: <span className={`text-xl font-black ${scorpionDistance < 30 ? 'text-red-500' : 'text-white'}`}>{Math.round(scorpionDistance)}m</span>
              </span>
            </div>
          </div>

          {/* Dynamic Interactive Chase Track */}
          <div className="relative z-10 my-4 h-14 bg-gray-950/90 rounded-2xl overflow-hidden border border-white/10 shadow-inner flex items-center">
            
            {/* Speed Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px)] bg-[size:16px_100%]" />

            {/* Danger Gap Zone Fill Between Scorpion & Runner */}
            <div 
              className="absolute h-full bg-gradient-to-r from-red-600/30 via-amber-500/20 to-emerald-500/10 transition-all duration-300"
              style={{
                left: `${scorpionPosPercent}%`,
                width: `${runnerPosPercent - scorpionPosPercent}%`
              }}
            />

            {/* Moving Scorpion Sprite */}
            <div 
              className="absolute transition-all duration-300 ease-out flex flex-col items-center -translate-x-1/2 z-20"
              style={{ left: `${scorpionPosPercent}%` }}
            >
              <span className={`text-2xl filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] ${
                scorpionDistance < 30 ? 'scale-125 animate-bounce' : 'animate-pulse'
              }`}>
                🦂
              </span>
              <span className="text-[9px] font-black text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/40 mt-0.5">
                SCORPION
              </span>
            </div>

            {/* Moving Runner Sprite */}
            <div 
              className="absolute transition-all duration-150 ease-out flex flex-col items-center -translate-x-1/2 z-20"
              style={{ left: `${runnerPosPercent}%` }}
            >
              <span className={`text-2xl filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] ${
                isGainingGround ? 'scale-125 -translate-y-1' : ''
              }`}>
                🏃
              </span>
              <span className="text-[9px] font-black text-emerald-400 bg-black/80 px-1.5 py-0.5 rounded border border-emerald-500/40 mt-0.5">
                YOU
              </span>
            </div>
          </div>

          {/* Interactive Event Action Ticker */}
          <div className="relative z-10 flex items-center justify-between text-xs font-bold pt-1 px-1">
            <span className={`transition-colors duration-200 ${
              isGainingGround ? 'text-emerald-400 font-extrabold' : scorpionDistance < 30 ? 'text-red-400' : 'text-gray-300'
            }`}>
              {scorpionActionText}
            </span>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase">ESCAPE THRESHOLD: 100m</span>
          </div>
        </div>
      )}

      {/* Overdrive HUD */}
      {isOverdriveMode && (
        <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 p-4 rounded-xl">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Flame className="w-5 h-5 animate-bounce" />
            <span>COMBO: <span className="text-2xl text-white">{combo}x</span></span>
          </div>
          <div className="text-amber-300 font-extrabold text-lg">
            MULTIPLIER: <span className="text-2xl text-amber-400">{multiplier}x</span>
          </div>
          <div className="text-gray-300 font-semibold text-sm">
            SCORE: <span className="text-xl text-white">{overdriveScore}</span>
          </div>
        </div>
      )}

      {/* Mirror Mode HUD */}
      {isMirrorMode && (
        <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
          activeDisruption 
            ? 'bg-purple-900/40 border-purple-500 text-purple-300 animate-pulse' 
            : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-gray-400'
        }`}>
          <div className="flex items-center space-x-2">
            <EyeOff className="w-4 h-4 text-purple-400" />
            <span>{disruptionLabel || 'NORMAL FOCUS ACTIVE'}</span>
          </div>
          <div>
            FOCUS SCORE: <span className="text-white text-sm font-bold">{focusScore}</span>
          </div>
        </div>
      )}

      {/* Standard Telemetry Bar */}
      <div className="flex items-center justify-between bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 rounded-xl text-sm transition-colors duration-200">
        <div className="flex items-center space-x-2 text-[var(--theme-accent)] font-semibold">
          <Zap className="w-4 h-4" />
          <span>WPM: <span className="text-white text-lg font-bold">{wpm}</span></span>
        </div>

        <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
          <Target className="w-4 h-4" />
          <span>Accuracy: <span className="text-white text-lg font-bold">{accuracy}%</span></span>
        </div>

        {!isScorpionMode && (
          <div className="text-xs tracking-widest text-gray-400">
            {isWordMode ? 'TARGET: ' : 'TIME: '}
            <span className="text-[var(--theme-accent)] text-lg font-bold">
              {isWordMode ? `${getTargetWordCount()} W` : `${timer}s`}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Text Canvas */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className={`relative min-h-[140px] bg-[var(--theme-surface)]/60 border border-[var(--theme-border)] p-6 rounded-xl text-lg leading-relaxed cursor-text tracking-wide transition-all duration-300 ${
          activeDisruption === 'GLITCH' ? 'skew-x-3 blur-[0.5px]' : ''
        } ${
          activeDisruption === 'MIRROR_FLIP' ? '-scale-x-100 text-right' : ''
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default"
          autoFocus
        />

        {activeDisruption === 'BLACKOUT' ? (
          <div className="flex flex-col items-center justify-center py-8 text-purple-300 font-bold space-y-2">
            <ShieldAlert className="w-8 h-8 animate-bounce text-purple-400" />
            <p>BLACKOUT ACTIVE — TYPE FROM MEMORY</p>
          </div>
        ) : (
          textBuffer.split('').map((char, index) => {
            let charStyle = 'text-gray-600';
            if (index < userInput.length) {
              charStyle = userInput[index] === char 
                ? 'text-[var(--theme-accent)] font-semibold' 
                : 'text-red-500 bg-red-500/10 rounded';
            }
            const isCurrent = index === userInput.length;

            return (
              <span key={index} className={`${charStyle} ${isCurrent ? 'border-b-2 border-[var(--theme-accent)] animate-pulse' : ''}`}>
                {char}
              </span>
            );
          })
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center pt-2">
        <button
          onClick={initTest}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-gray-300 hover:text-white rounded-lg transition-all text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Test</span>
        </button>
      </div>

      {/* Result Modal */}
      {isCompleted && (
        <ResultModal
          isOpen={isCompleted}
          stats={{
            mode,
            wpm: wpm || 0,
            accuracy: accuracy || 100,
            correctChars: correctCount,
            incorrectChars: incorrectCount,
            rawWpm: Math.round(((correctCount + incorrectCount) / 5) / ((getInitialTime() - timer || 1) / 60)) || 0
          }}
          onRestart={initTest}
        />
      )}
    </div>
  );
}