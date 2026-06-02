import React, { useState } from 'react';
import { Sun, Leaf, Activity, ArrowDown } from 'lucide-react';

const cycleNodes = [
  {
    id: 'solar',
    title: 'Solar Radiance',
    icon: Sun,
    coords: { x: 150, y: 110 },
    description: 'The foundation of all biome cycles. Sunlight delivers photons, triggering photosynthesis and driving global atmospheric currents and temperature balances.',
    detail: 'Photons excite chlorophyll in leaves, split water molecules, and synthesize glucose, storing solar energy as molecular bonds.',
  },
  {
    id: 'canopy',
    title: 'Canopy Photosynthesis',
    icon: Leaf,
    coords: { x: 400, y: 90 },
    description: 'The green powerhouse. Tall tree canopies absorb carbon dioxide and release oxygen, locking carbon into cellulose and sugar fibers.',
    detail: 'Forest leaves act as the lungs of the earth, filtering air particulate, moderating moisture, and producing oxygen.',
  },
  {
    id: 'decomposers',
    title: 'Organic Decomposition',
    icon: Activity,
    coords: { x: 620, y: 250 },
    description: 'The nutrient recyclers. Soil microbes, slugs, and fungi decompose fallen leaves, branches, and organic waste back into basic minerals.',
    detail: 'Bioluminescent mushrooms and slugs break down heavy lignin and cellulose structures, enriching the topsoil layer.',
  },
  {
    id: 'roots',
    title: 'Root Absorption',
    icon: ArrowDown,
    coords: { x: 260, y: 270 },
    description: 'Water and mineral pump. Vast sub-soil root networks siphon moisture and recycled soil nutrients, transferring them back up to the branches.',
    detail: 'Mycorrhizal fungi connect root structures, sharing nitrogen and minerals across trees to sustain the forest community.',
  },
];

export default function EcologicalCycle() {
  const [activeNode, setActiveNode] = useState('solar');
  const activeData = cycleNodes.find((n) => n.id === activeNode);

  return (
    <div className="energy-cycle">
      <div className="section-header">
        <h2 className="section-title glow-text font-serif">
          Nature's Energy Cycle
        </h2>
        <p className="section-subtitle">
          Click any glowing node on the interactive map to inspect how energy and minerals cycle through the forest ecosystem.
        </p>
      </div>

      <div className="energy-cycle-content">
        {/* Interactive SVG Diagram */}
        <div className="cycle-svg-container glass-panel">
          <svg viewBox="0 0 780 380" className="cycle-svg">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity="0.2" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting paths */}
            {/* 1. Solar to Canopy */}
            <path d="M 170 120 C 250 80, 320 80, 380 95" fill="none" stroke="var(--glass-border)" strokeWidth="2" />
            <path
              d="M 170 120 C 250 80, 320 80, 380 95"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="12, 180"
              strokeDashoffset="0"
              className="dash-animation-1"
            />

            {/* 2. Canopy to Decomposers */}
            <path d="M 420 100 C 500 100, 580 160, 600 230" fill="none" stroke="var(--glass-border)" strokeWidth="2" />
            <path
              d="M 420 100 C 500 100, 580 160, 600 230"
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="3"
              strokeDasharray="12, 180"
              strokeDashoffset="0"
              className="dash-animation-2"
            />

            {/* 3. Decomposers to Roots */}
            <path d="M 600 260 C 500 280, 360 280, 280 275" fill="none" stroke="var(--glass-border)" strokeWidth="2" />
            <path
              d="M 600 260 C 500 280, 360 280, 280 275"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="12, 180"
              strokeDashoffset="0"
              className="dash-animation-3"
            />

            {/* 4. Roots to Canopy */}
            <path d="M 270 250 C 310 180, 350 130, 390 105" fill="none" stroke="var(--glass-border)" strokeWidth="2" />
            <path
              d="M 270 250 C 310 180, 350 130, 390 105"
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="3"
              strokeDasharray="12, 180"
              strokeDashoffset="0"
              className="dash-animation-4"
            />

            {/* 5. Roots to Solar (Atmosphere) */}
            <path d="M 240 270 C 120 250, 100 180, 130 130" fill="none" stroke="var(--glass-border)" strokeWidth="2" />
            <path
              d="M 240 270 C 120 250, 100 180, 130 130"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="12, 180"
              strokeDashoffset="0"
              className="dash-animation-5"
            />

            {/* Render Nodes */}
            {cycleNodes.map((node) => {
              const NodeIcon = node.icon;
              const isActive = activeNode === node.id;

              return (
                <g
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className="cycle-node-group"
                >
                  <circle
                    cx={node.coords.x}
                    cy={node.coords.y}
                    r={isActive ? 36 : 28}
                    className={`node-glow-ring ${isActive ? 'active' : ''}`}
                    filter={isActive ? 'url(#glow)' : ''}
                  />
                  <circle
                    cx={node.coords.x}
                    cy={node.coords.y}
                    r={isActive ? 32 : 24}
                    className={`node-base-circle ${isActive ? 'active' : ''}`}
                  />
                  <g transform={`translate(${node.coords.x - 12}, ${node.coords.y - 12})`}>
                    <NodeIcon
                      size={24}
                      className={`node-icon ${isActive ? 'active' : ''}`}
                    />
                  </g>
                  <text
                    x={node.coords.x}
                    y={node.coords.y + 45}
                    textAnchor="middle"
                    className={`node-text-label ${isActive ? 'active' : ''}`}
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detailed Explanation Panel */}
        <div className="cycle-detail-panel glass-panel">
          <div>
            <span className="detail-panel-tag">
              Active Focus
            </span>
            <h3 className="detail-panel-title">
              {activeData.title}
            </h3>
            <p className="detail-panel-desc">
              {activeData.description}
            </p>
            <div className="detail-info-box">
              <span className="detail-info-label">
                Ecosystem Detail:
              </span>
              {activeData.detail}
            </div>
          </div>

          <div className="detail-footnote">
            * Selected node lights up the matching biochemical transfer stream.
          </div>
        </div>
      </div>
    </div>
  );
}
