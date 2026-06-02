import React from 'react';
import { Compass, ArrowDown, Droplets, Thermometer, Wind, Leaf } from 'lucide-react';

const biomeStats = {
  rainforest: {
    temp: '24°C',
    humidity: '92%',
    wind: '4 km/h',
    carbon: '-18.4 ppm',
    activeSound: 'Rain & Canopy birds',
  },
  meadow: {
    temp: '16°C',
    humidity: '48%',
    wind: '18 km/h',
    carbon: '-12.1 ppm',
    activeSound: 'Meadow Gusts & Swallows',
  },
  redwood: {
    temp: '19°C',
    humidity: '72%',
    wind: '8 km/h',
    carbon: '-26.8 ppm',
    activeSound: 'Bark Rustle & Spotted Owls',
  },
  glen: {
    temp: '11°C',
    humidity: '85%',
    wind: '3 km/h',
    carbon: '-15.2 ppm',
    activeSound: 'Twilight Crickets & Fireflies',
  },
};

export default function Hero({ biome }) {
  const stats = biomeStats[biome] || biomeStats.rainforest;

  const scrollToSelector = () => {
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero">
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* Hero Badge */}
      <div className="hero-badge">
        <Compass size={12} className="badge-icon" />
        <span>Aetheria Wilds</span>
      </div>

      {/* Hero Title and Subtitle */}
      <div className="hero-content">
        <h1 className="hero-title">
          Experience the Living <br />
          <span className="hero-title-accent glow-text">
            Breath of Nature
          </span>
        </h1>
        <p className="hero-subtitle">
          Step into a procedurally synthesized environment. Shift biomes, listen to generated soundscapes, and breathe alongside the carbon pulses of the earth.
        </p>

        <div className="hero-actions">
          <button onClick={scrollToSelector} className="btn-primary glow-btn">
            Enter Sanctuary
          </button>
          <a href="#dashboard-section" className="btn-secondary">
            Wellness Board
          </a>
        </div>
      </div>

      {/* Telemetry Status Board */}
      <div className="telemetry-board glass-panel">
        
        {/* Stat item */}
        <div className="telemetry-item">
          <div className="telemetry-icon">
            <Thermometer size={18} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Temperature</span>
            <span className="telemetry-value">{stats.temp}</span>
          </div>
        </div>

        {/* Stat item */}
        <div className="telemetry-item">
          <div className="telemetry-icon">
            <Droplets size={18} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Air Humidity</span>
            <span className="telemetry-value">{stats.humidity}</span>
          </div>
        </div>

        {/* Stat item */}
        <div className="telemetry-item">
          <div className="telemetry-icon">
            <Wind size={18} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">Wind Force</span>
            <span className="telemetry-value">{stats.wind}</span>
          </div>
        </div>

        {/* Stat item */}
        <div className="telemetry-item">
          <div className="telemetry-icon">
            <Leaf size={18} />
          </div>
          <div className="telemetry-info">
            <span className="telemetry-label">CO2 Sequestration</span>
            <span className="telemetry-value">{stats.carbon}</span>
          </div>
        </div>

        {/* Audio Box */}
        <div className="telemetry-audio-box">
          <span className="telemetry-audio-label">Active Audio Stream</span>
          <span className="telemetry-audio-value">{stats.activeSound}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={scrollToSelector} className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <ArrowDown size={14} className="scroll-arrow" />
      </button>
    </div>
  );
}
