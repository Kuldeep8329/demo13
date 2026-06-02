import React from 'react';
import { CloudRain, Flower, Trees, Sparkles } from 'lucide-react';

const biomes = [
  {
    id: 'rainforest',
    name: 'Temperate Rainforest',
    description: 'Mossy bark, dripping emerald foliage, and rich forest floor mist.',
    icon: CloudRain,
    tag: 'Drizzling & Lush',
  },
  {
    id: 'meadow',
    name: 'Alpine Meadow',
    description: 'Vibrant wild blooms, clean high-altitude skies, and dancing wind.',
    icon: Flower,
    tag: 'Sunlit & Breezy',
  },
  {
    id: 'redwood',
    name: 'Redwood Forest',
    description: 'Ancient soaring bark giants, earthy floor humus, and birdsong.',
    icon: Trees,
    tag: 'Towering & Majestic',
  },
  {
    id: 'glen',
    name: 'Mystic Glen',
    description: 'Midnight glowing spores, quiet firefly lights, and peaceful night hum.',
    icon: Sparkles,
    tag: 'Starlit & Glowing',
  },
];

export default function BiomeSelector({ activeBiome, onBiomeChange }) {
  return (
    <div className="biome-selector">
      <div className="section-header">
        <span className="section-tag">Interactive Sanctuary</span>
        <h2 className="section-title glow-text">Select Your Environment</h2>
        <p className="section-subtitle">
          Dynamically shift the entire webpage aesthetic, canvas particle simulation, and procedural ambient audio generator.
        </p>
      </div>

      <div className="biome-grid">
        {biomes.map((biome) => {
          const IconComponent = biome.icon;
          const isActive = activeBiome === biome.id;

          return (
            <button
              key={biome.id}
              onClick={() => onBiomeChange(biome.id)}
              className={`biome-btn glass-panel ${isActive ? 'active' : ''}`}
            >
              <div className="biome-btn-top">
                <div className={`biome-icon-container ${isActive ? 'active' : ''}`}>
                  <IconComponent size={24} />
                </div>
                <span className="biome-btn-tag">{biome.tag}</span>
                <h3 className="biome-btn-title">{biome.name}</h3>
                <p className="biome-btn-desc">{biome.description}</p>
              </div>

              <div className="biome-btn-bottom">
                <span className={`biome-status-badge ${isActive ? 'active' : ''}`}>
                  {isActive ? 'Active Biome' : 'Explore'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
