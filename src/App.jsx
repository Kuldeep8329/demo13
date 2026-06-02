import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BiomeSelector from './components/BiomeSelector';
import SoundscapeController from './components/SoundscapeController';
import BreathingGuide from './components/BreathingGuide';
import FloraFauna from './components/FloraFauna';
import EcologicalCycle from './components/EcologicalCycle';
import BackgroundParticles from './components/BackgroundParticles';
import { Leaf, Info } from 'lucide-react';

export default function App() {
  const [biome, setBiome] = useState('rainforest');

  // Dynamically update body class list on biome state transitions
  useEffect(() => {
    // Remove existing theme classes
    const themes = ['theme-rainforest', 'theme-meadow', 'theme-redwood', 'theme-glen'];
    themes.forEach((t) => document.body.classList.remove(t));

    // Add current biome theme class
    document.body.classList.add(`theme-${biome}`);
  }, [biome]);

  return (
    <div className="app-container">

      {/* Background Canvas Particles */}
      <BackgroundParticles biome={biome} />

      {/* Navigation Bar */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Leaf size={18} className="logo-icon" />
            <span>AETHERIA</span>
          </div>

          <nav className="nav-links">
            <a href="#explore-section">Biomes</a>
            <a href="#dashboard-section">Sanctuary</a>
            <a href="#encyclopedia-section">Encyclopedia</a>
            <a href="#cycle-section">Energy Flows</a>
          </nav>

          <div className="header-actions">
            <span className="biome-badge">{biome} Biome</span>
          </div>
        </div>
      </header>
//this changes are for demo
      {/* Layout Content */}
      <main className="main-container">

        {/* Hero Section */}
        <section id="hero-section">
          <Hero biome={biome} />
        </section>

        <div className="section-divider" />

        {/* Biome Selector Section */}
        <section id="explore-section" className="scroll-target">
          <BiomeSelector activeBiome={biome} onBiomeChange={setBiome} />
        </section>

        <div className="section-divider" />

        {/* Sanctuary Interactive Dashboard */}
        <section id="dashboard-section" className="scroll-target">
          <div className="section-header">
            <span className="section-tag">Wellness Dashboard</span>
            <h2 className="section-title glow-text">Personal Healing Sanctuary</h2>
            <p className="section-subtitle">
              Combine synthesized biological sounds with a deep breathing rhythm to lower stress and ground your awareness in the present.
            </p>
          </div>

          <div className="dashboard-grid">
            <SoundscapeController biome={biome} />
            <BreathingGuide />
          </div>
        </section>

        <div className="section-divider" />

        {/* Flora & Fauna Section */}
        <section id="encyclopedia-section" className="scroll-target">
          <FloraFauna biome={biome} />
        </section>

        <div className="section-divider" />

        {/* Energy Cycle Section */}
        <section id="cycle-section" className="scroll-target">
          <EcologicalCycle />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Leaf size={16} className="logo-icon" />
            <span>AETHERIA WILDS</span>
          </div>

          <div className="footer-info">
            <Info size={12} className="info-icon" />
            <span>
              This immersive portal utilizes procedural synthesis algorithms (Web Audio API / Canvas2D) to simulate nature. All audio and particle assets are rendered mathematically in real-time.
            </span>
          </div>

          <p className="footer-copyright">
            &copy; 2026 Aetheria Project. Inspired by the natural world.
          </p>
        </div>
      </footer>
    </div>
  );
}
