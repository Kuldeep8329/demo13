import React, { useState } from 'react';
import { Sparkles, X, Heart, Globe, RefreshCw } from 'lucide-react';

const speciesData = {
  rainforest: [
    {
      name: 'Epiphytic Moss & Ferns',
      type: 'Flora',
      scientific: 'Polypodiopsida',
      fact: 'Grows on host trees, absorbing water and nutrients directly from the humid air rather than the soil.',
      role: 'Creates canopy micro-habitats for tree frogs and invertebrates, holding massive reservoirs of rain.',
    },
    {
      name: 'Banded Tree Snail',
      type: 'Fauna',
      scientific: 'Liguus fasciatus',
      fact: 'Possesses vibrant, swirling stripes. They graze quietly on microscopic algae growing on smooth bark.',
      role: 'Prevents algae and fungus overgrowth on host tree leaves and serves as food for forest birds.',
    },
    {
      name: 'Emerald Tree Boa',
      type: 'Fauna',
      scientific: 'Corallus caninus',
      fact: 'Spends its life coiled over tree branches, using heat-sensitive pits around its mouth to hunt in total darkness.',
      role: 'Acts as an essential canopy predator, keeping rodent and small mammal populations balanced.',
    },
  ],
  meadow: [
    {
      name: 'Purple Lupine',
      type: 'Flora',
      scientific: 'Lupinus perennis',
      fact: 'Features tall, purple cones. They host symbiotic bacteria in their roots that pull nitrogen directly from the air to fertilize poor mountain soil.',
      role: 'Enriches soil nutrient profiles, preparing the ground for weaker grasses, and hosts endangered butterfly caterpillars.',
    },
    {
      name: 'Golden Eagle',
      type: 'Fauna',
      scientific: 'Aquila chrysaetos',
      fact: 'With wingspans reaching up to 7.5 feet, golden eagles use thermal wind drafts to glide effortlessly over alpine ridges.',
      role: 'Apex avian predator, maintaining healthy populations of hares, marmots, and ground squirrels.',
    },
    {
      name: 'Yellow-bellied Marmot',
      type: 'Fauna',
      scientific: 'Marmota flaviventris',
      fact: 'A large mountain squirrel that hibernates for up to 8 months a year. It emits a loud whistle to warn others of predators.',
      role: 'Excavates deep burrow systems that aerate mountain soils and provide shelter for other small mammals.',
    },
  ],
  redwood: [
    {
      name: 'Coast Redwood',
      type: 'Flora',
      scientific: 'Sequoia sempervirens',
      fact: 'The tallest trees on Earth, reaching heights over 370 feet. They create their own microclimates by capturing coastal fog.',
      role: 'Stabilizes soil along watersheds, sequesters immense levels of carbon, and forms massive complex canopy structures.',
    },
    {
      name: 'Banana Slug',
      type: 'Fauna',
      scientific: 'Ariolimax columbianus',
      fact: 'Bright yellow slug that breathes through a single pore on its side and can grow up to 10 inches in length.',
      role: 'Vital forest recycler (detritivore) that breaks down fallen redwood leaves, spores, and mosses into rich fertile soil.',
    },
    {
      name: 'Northern Spotted Owl',
      type: 'Fauna',
      scientific: 'Strix occidentalis caurina',
      fact: 'Nests only in hollow cavities of old-growth trees. Their soft feathers allow them to glide completely silently.',
      role: 'Key indicator species for the health of old-growth redwood forests, preying on wood rats and flying squirrels.',
    },
  ],
  glen: [
    {
      name: 'Ghost Mushroom',
      type: 'Flora',
      scientific: 'Omphalotus nidiformis',
      fact: 'A bioluminescent fungus that emits a steady, soft green light through a chemical reaction involving luciferin.',
      role: 'Decomposes fallen wood debris and decaying roots, lighting up forest paths to attract nocturnal spores dispersers.',
    },
    {
      name: 'Luna Moth',
      type: 'Fauna',
      scientific: 'Actias luna',
      fact: 'Lacks a mouth or digestive system in its adult moth form; it lives for only one week solely to mate and reproduce under starlight.',
      role: 'Acts as a high-nutrition food source for night bats and owls, and serves as an indicators of air purity.',
    },
    {
      name: 'Common Firefly',
      type: 'Fauna',
      scientific: 'Photinus pyralis',
      fact: 'Communicates through custom flashes of bioluminescence, chemically generated in their lower abdomen with 100% light efficiency.',
      role: 'Serves as an key insect predator in its larval phase (preying on snails/slugs) and indicator of meadow humidity.',
    },
  ],
};

export default function FloraFauna({ biome }) {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const list = speciesData[biome] || [];

  return (
    <div className="encyclopedia">
      <div className="section-header">
        <h2 className="section-title glow-text font-serif">
          Flora & Fauna Encyclopedia
        </h2>
        <p className="section-subtitle">
          Select any organism to zoom in on its unique adaptations and role in preserving the environment's balance.
        </p>
      </div>

      <div className="encyclopedia-grid">
        {list.map((species, index) => (
          <div
            key={index}
            onClick={() => setSelectedSpecies(species)}
            className="species-card glass-panel group"
          >
            <div className="species-card-content">
              <div className="species-card-header">
                <span className="species-type-badge">
                  {species.type}
                </span>
                <Sparkles size={14} className="species-sparkle-icon" />
              </div>
              <h3 className="species-card-title">
                {species.name}
              </h3>
              <p className="species-scientific-name">
                {species.scientific}
              </p>
              <p className="species-card-snippet">
                {species.fact}
              </p>
            </div>

            <div className="species-card-footer">
              <span>View Details</span>
              <span className="footer-arrow">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedSpecies && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button
              onClick={() => setSelectedSpecies(null)}
              className="modal-close-btn"
            >
              <X size={18} />
            </button>

            <div className="modal-header">
              <span className="species-type-badge active">
                {selectedSpecies.type}
              </span>
            </div>

            <h3 className="modal-title">
              {selectedSpecies.name}
            </h3>
            <p className="modal-scientific-name">
              {selectedSpecies.scientific}
            </p>

            <div className="modal-body">
              <div className="modal-info-block">
                <h4 className="info-block-title">
                  <Globe size={12} className="info-block-icon" /> Adaptational Fact
                </h4>
                <p className="info-block-text">
                  {selectedSpecies.fact}
                </p>
              </div>

              <div className="modal-info-block">
                <h4 className="info-block-title">
                  <Heart size={12} className="info-block-icon heart-color" /> Ecological Role
                </h4>
                <p className="info-block-text">
                  {selectedSpecies.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSpecies(null)}
              className="btn-primary glow-btn full-width flex-center"
            >
              <RefreshCw size={12} className="btn-icon" /> Return to Encyclopedia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
