import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Square, Wind, CloudRain, Trees } from 'lucide-react';
import { soundManager } from '../utils/soundGenerator';

export default function SoundscapeController({ biome }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVol, setMasterVol] = useState(0.5);
  const [windVol, setWindVol] = useState(0.3);
  const [rainVol, setRainVol] = useState(0.2);
  const [birdsVol, setBirdsVol] = useState(0.4);
  const canvasRef = useRef(null);

  // Sync state volumes on biome change
  useEffect(() => {
    if (isPlaying) {
      soundManager.adjustForBiome(biome);
      // Sync local slider display values to represent biome defaults
      switch (biome) {
        case 'rainforest':
          setWindVol(0.1);
          setRainVol(0.6);
          setBirdsVol(0.08);
          break;
        case 'meadow':
          setWindVol(0.55);
          setRainVol(0.0);
          setBirdsVol(0.15);
          break;
        case 'redwood':
          setWindVol(0.25);
          setRainVol(0.0);
          setBirdsVol(0.6);
          break;
        case 'glen':
          setWindVol(0.15);
          setRainVol(0.08);
          setBirdsVol(0.04);
          break;
      }
    }
  }, [biome, isPlaying]);

  // Audio wave visualizer simulation (client-only mock when playing)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const bars = 25;
    const barHeights = Array(bars).fill(2);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#34d399';

      for (let i = 0; i < bars; i++) {
        // Targets based on active sound layers
        let targetHeight = 2;
        if (isPlaying) {
          let multiplier = 5;
          if (i % 3 === 0) multiplier += windVol * 15;
          if (i % 3 === 1) multiplier += rainVol * 25;
          if (i % 3 === 2) multiplier += birdsVol * 20;

          targetHeight = 2 + Math.random() * multiplier * masterVol;
        }

        // Ease towards target
        barHeights[i] += (targetHeight - barHeights[i]) * 0.2;

        const w = (canvas.width / bars) - 2;
        const x = i * (w + 2);
        const h = barHeights[i];
        const y = canvas.height - h;

        ctx.fillRect(x, y, w, h);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, windVol, rainVol, birdsVol, masterVol]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundManager.stop();
      setIsPlaying(false);
    } else {
      soundManager.start();
      soundManager.setMasterVolume(masterVol);
      soundManager.adjustForBiome(biome);
      setIsPlaying(true);
    }
  };

  const handleMasterVolChange = (e) => {
    const val = parseFloat(e.target.value);
    setMasterVol(val);
    soundManager.setMasterVolume(val);
  };

  const handleSliderChange = (type, val) => {
    if (type === 'wind') {
      setWindVol(val);
      soundManager.setVolume('wind', val);
    } else if (type === 'rain') {
      setRainVol(val);
      soundManager.setVolume('rain', val);
    } else if (type === 'birds') {
      setBirdsVol(val);
      soundManager.setVolume('birds', val);
    }
  };

  return (
    <div className="audio-controller glass-panel">
      {/* Audio Activity Visualizer Header */}
      <div className="audio-visualizer-header">
        <canvas ref={canvasRef} width="400" height="4" />
      </div>

      <div className="audio-controller-header">
        <div>
          <h3 className="audio-controller-title">
            <Volume2 size={18} className="audio-icon animate-pulse-slow" />
            Synthesized Soundscape
          </h3>
          <p className="audio-controller-subtitle">Procedural Web Audio API</p>
        </div>

        <button
          onClick={handleTogglePlay}
          className={`btn-play-pause ${isPlaying ? 'playing' : ''}`}
        >
          {isPlaying ? (
            <>
              <Square size={12} fill="currentColor" /> Mute Ambient
            </>
          ) : (
            <>
              <Play size={12} fill="currentColor" /> Play Ambient
            </>
          )}
        </button>
      </div>

      {/* Volume Sliders */}
      <div className="sliders-container">
        {/* Master Slider */}
        <div className="slider-item">
          <div className="slider-labels">
            <span className="slider-title">Master Volume</span>
            <span className="slider-value">{Math.round(masterVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVol}
            onChange={handleMasterVolChange}
            className="styled-slider"
          />
        </div>

        <hr className="divider-subtle" />

        {/* Wind Volume */}
        <div className="slider-item">
          <div className="slider-labels text-muted">
            <span className="slider-title">
              <Wind size={12} className="inline-icon" /> Wind Ambient
            </span>
            <span className="slider-value">{Math.round(windVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={windVol}
            disabled={!isPlaying}
            onChange={(e) => handleSliderChange('wind', parseFloat(e.target.value))}
            className="styled-slider"
          />
        </div>

        {/* Rain Volume */}
        <div className="slider-item">
          <div className="slider-labels text-muted">
            <span className="slider-title">
              <CloudRain size={12} className="inline-icon" /> Rain Density
            </span>
            <span className="slider-value">{Math.round(rainVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={rainVol}
            disabled={!isPlaying}
            onChange={(e) => handleSliderChange('rain', parseFloat(e.target.value))}
            className="styled-slider"
          />
        </div>

        {/* Birds Chirping Volume */}
        <div className="slider-item">
          <div className="slider-labels text-muted">
            <span className="slider-title">
              <Trees size={12} className="inline-icon" /> Forest Wildlife
            </span>
            <span className="slider-value">{Math.round(birdsVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={birdsVol}
            disabled={!isPlaying}
            onChange={(e) => handleSliderChange('birds', parseFloat(e.target.value))}
            className="styled-slider"
          />
        </div>
      </div>

      {!isPlaying && (
        <p className="audio-footnote">
          * Note: Web browsers require interaction to play procedural sound.
        </p>
      )}
    </div>
  );
}
