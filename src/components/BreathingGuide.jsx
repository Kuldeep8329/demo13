import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function BreathingGuide() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Rest
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalBreaths, setTotalBreaths] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('Inhale');
      setTimeLeft(4);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch phase
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Rest');
            return 4;
          } else {
            setPhase('Inhale');
            setTotalBreaths((b) => b + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'Inhale': return 'Breathe In';
      case 'Hold': return 'Hold Breath';
      case 'Exhale': return 'Breathe Out';
      case 'Rest': return 'Pause & Rest';
      default: return 'Breathe';
    }
  };

  const getBubbleScale = () => {
    if (!isActive) return 'scale-90';
    switch (phase) {
      case 'Inhale': return 'scale-125'; // expanding
      case 'Hold': return 'scale-125';   // holding expanded
      case 'Exhale': return 'scale-90';  // shrinking
      case 'Rest': return 'scale-90';    // holding shrunk
      default: return 'scale-100';
    }
  };

  const getProgressPercentage = () => {
    return ((4 - timeLeft) / 4) * 100;
  };

  return (
    <div className="breathing-guide glass-panel">
      <div className="breathing-header">
        <h3 className="breathing-title">Mindful Breathing Space</h3>
        <p className="breathing-subtitle">Align your rhythm with nature</p>
      </div>

      {/* Breathing Bubble */}
      <div className="breathing-container">
        {/* Animated breathing pulse circles */}
        <div className={`breathing-outer-ring transition-4s ${getBubbleScale()}`} />
        <div className={`breathing-inner-ring transition-4s ${getBubbleScale()}`} />
        
        {/* Main interactive center bubble */}
        <div className={`breathing-core transition-4s ${getBubbleScale()}`}>
          {isActive ? (
            <>
              <span className="breathing-timer">{timeLeft}s</span>
              <span className="breathing-phase">{phase}</span>
            </>
          ) : (
            <span className="breathing-ready">Ready</span>
          )}
        </div>

        {/* Progress SVG path running around bubble */}
        {isActive && (
          <svg className="breathing-svg-progress">
            <circle
              cx="88"
              cy="88"
              r="76"
              className="progress-bg"
            />
            <circle
              cx="88"
              cy="88"
              r="76"
              className="progress-bar"
              strokeDasharray={2 * Math.PI * 76}
              strokeDashoffset={2 * Math.PI * 76 * (1 - getProgressPercentage() / 100)}
            />
          </svg>
        )}
      </div>

      {/* Guide text */}
      <div className="breathing-instructions">
        {isActive ? (
          <>
            <p className="instruction-text">{getPhaseText()}</p>
            <p className="instruction-sub">
              Cycle breath count: {totalBreaths} completed
            </p>
          </>
        ) : (
          <p className="instruction-text-ready">
            Click start to begin a calming box-breathing cycle
          </p>
        )}
      </div>

      {/* Start Button */}
      <button
        onClick={() => {
          setIsActive(!isActive);
          if (!isActive) setTotalBreaths(0);
        }}
        className="btn-primary glow-btn full-width flex-center"
      >
        {isActive ? (
          <>
            <EyeOff size={14} className="btn-icon" /> Stop Exercise
          </>
        ) : (
          <>
            <Eye size={14} className="btn-icon" /> Begin Breath
          </>
        )}
      </button>
    </div>
  );
}
