'use client';

import { useMemo, useState } from 'react';
import materials from '@/src/data/car_materials.json';

type CarType = 'standard' | 'sports' | 'ev';
type ZoneKey = 'chassis' | 'brake_disc' | 'engine_block' | 'hood' | 'windows' | 'tires';

type ZoneDetails = {
  primaryMaterial: string;
  whyChosen: string;
  tradeoff: string;
  futureInnovation: string;
};

type CarMaterialsData = Record<CarType, Record<ZoneKey, ZoneDetails>>;

const carMaterials = materials as CarMaterialsData;

const zoneLabels: Record<ZoneKey, string> = {
  chassis: 'Chassis',
  brake_disc: 'Brake Disc',
  engine_block: 'Engine Block',
  hood: 'Hood',
  windows: 'Windows',
  tires: 'Tires',
};

function CarSilhouetteSvg({
  selected,
  hovered,
  onHover,
  onSelect,
}: {
  selected: ZoneKey;
  hovered: ZoneKey | null;
  onHover: (zone: ZoneKey | null) => void;
  onSelect: (zone: ZoneKey) => void;
}) {
  const isHot = (z: ZoneKey) => hovered === z || selected === z;
  const fillFor = (z: ZoneKey) => (isHot(z) ? 'rgba(8, 145, 178, 0.28)' : 'rgba(8, 145, 178, 0.14)');
  const strokeFor = (z: ZoneKey) => (isHot(z) ? 'rgba(8, 145, 178, 0.95)' : 'rgba(8, 145, 178, 0.45)');
  const strokeW = (z: ZoneKey) => (isHot(z) ? 2.2 : 1.2);

  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto" role="img" aria-label="Car materials side-profile map">
      {/* Base car silhouette */}
      <path
        d="M75 178 L110 138 C130 115 170 98 205 98 L360 98 C410 98 455 110 500 135 L560 150 C585 156 610 165 635 178 L655 190 L655 212 C655 222 647 230 637 230 L610 230 C605 205 584 186 558 186 C532 186 511 205 506 230 L250 230 C245 205 224 186 198 186 C172 186 151 205 146 230 L100 230 C88 230 78 220 78 208 Z"
        fill="rgba(15, 23, 42, 0.08)"
        stroke="rgba(15, 23, 42, 0.28)"
        strokeWidth="2"
      />

      {/* Tires (clickable region) */}
      <g
        id="tires"
        className="cursor-pointer"
        onMouseEnter={() => onHover('tires')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('tires')}
      >
        <circle cx="198" cy="230" r="38" fill={fillFor('tires')} stroke={strokeFor('tires')} strokeWidth={strokeW('tires')} />
        <circle cx="558" cy="230" r="38" fill={fillFor('tires')} stroke={strokeFor('tires')} strokeWidth={strokeW('tires')} />
        <circle cx="198" cy="230" r="18" fill="rgba(15, 23, 42, 0.10)" />
        <circle cx="558" cy="230" r="18" fill="rgba(15, 23, 42, 0.10)" />
      </g>

      {/* Brake disc (front wheel) */}
      <g
        id="brake_disc"
        className="cursor-pointer"
        onMouseEnter={() => onHover('brake_disc')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('brake_disc')}
      >
        <circle cx="558" cy="230" r="12" fill={fillFor('brake_disc')} stroke={strokeFor('brake_disc')} strokeWidth={strokeW('brake_disc')} />
      </g>

      {/* Windows */}
      <g
        id="windows"
        className="cursor-pointer"
        onMouseEnter={() => onHover('windows')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('windows')}
      >
        <path
          d="M255 108 L360 108 C405 108 432 116 466 132 L455 152 L250 152 L235 126 Z"
          fill={fillFor('windows')}
          stroke={strokeFor('windows')}
          strokeWidth={strokeW('windows')}
        />
      </g>

      {/* Hood (front upper body) */}
      <g
        id="hood"
        className="cursor-pointer"
        onMouseEnter={() => onHover('hood')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('hood')}
      >
        <path
          d="M130 170 L150 140 C165 125 195 112 225 112 L320 112 L320 170 Z"
          fill={fillFor('hood')}
          stroke={strokeFor('hood')}
          strokeWidth={strokeW('hood')}
        />
      </g>

      {/* Engine block (under hood) */}
      <g
        id="engine_block"
        className="cursor-pointer"
        onMouseEnter={() => onHover('engine_block')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('engine_block')}
      >
        <path
          d="M245 160 L305 160 L315 175 L315 200 L238 200 L238 175 Z"
          fill={fillFor('engine_block')}
          stroke={strokeFor('engine_block')}
          strokeWidth={strokeW('engine_block')}
        />
      </g>

      {/* Chassis (lower structural body) */}
      <g
        id="chassis"
        className="cursor-pointer"
        onMouseEnter={() => onHover('chassis')}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect('chassis')}
      >
        <path
          d="M110 190 L635 190 L655 212 C655 222 647 230 637 230 L610 230 C605 205 584 186 558 186 C532 186 511 205 506 230 L250 230 C245 205 224 186 198 186 C172 186 151 205 146 230 L100 230 C88 230 78 220 78 208 Z"
          fill={fillFor('chassis')}
          stroke={strokeFor('chassis')}
          strokeWidth={strokeW('chassis')}
        />
      </g>

      {/* Label */}
      <text x="18" y="28" fontSize="12" fill="currentColor" className="text-secondary">
        Active: {zoneLabels[selected]}
      </text>
    </svg>
  );
}

export function CarMaterialsToolPage() {
  const [carType, setCarType] = useState<CarType>('standard');
  const [selectedZone, setSelectedZone] = useState<ZoneKey>('chassis');
  const [hoveredZone, setHoveredZone] = useState<ZoneKey | null>(null);

  const activeData = useMemo(() => carMaterials[carType][selectedZone], [carType, selectedZone]);

  return (
    <section className="page-section active py-12 md:py-20 bg-[var(--bg-soft-light)] min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Car Parts Materials Map</h1>
        <p className="text-secondary mb-8 max-w-3xl">
          Click the car to understand material selection across structures, safety, cost, and performance constraints.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {([
            { key: 'standard', label: 'Standard car' },
            { key: 'sports', label: 'Sports car' },
            { key: 'ev', label: 'EV' },
          ] as Array<{ key: CarType; label: string }>).map((option) => (
            <button
              key={option.key}
              onClick={() => setCarType(option.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                carType === option.key
                  ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                  : 'bg-[var(--bg-light)] text-[var(--text-primary-light)] border-[var(--border-light)] hover:border-[var(--accent-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 items-start">
          <div className="bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] shadow-sm p-4 md:p-6">
            <p className="text-sm font-medium text-secondary mb-4">Hover to highlight. Click a region to update the sidebar.</p>
            <CarSilhouetteSvg
              selected={selectedZone}
              hovered={hoveredZone}
              onHover={setHoveredZone}
              onSelect={(z) => setSelectedZone(z)}
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {(Object.keys(zoneLabels) as ZoneKey[]).map((zone) => (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    selectedZone === zone
                      ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                      : 'bg-[var(--bg-soft-light)] text-secondary border-[var(--border-light)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  {zoneLabels[zone]}
                </button>
              ))}
            </div>
          </div>

          <aside className="bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-[var(--text-heading-light)] mb-1">{zoneLabels[selectedZone]}</h2>
            <p className="text-sm text-secondary mb-5">
              Vehicle profile: {carType === 'ev' ? 'EV' : `${carType[0].toUpperCase()}${carType.slice(1)} car`}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-heading-light)] mb-1">Primary material</h3>
                <p className="text-secondary">{activeData.primaryMaterial}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-heading-light)] mb-1">Why it is chosen</h3>
                <p className="text-secondary">{activeData.whyChosen}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-heading-light)] mb-1">Tradeoff</h3>
                <p className="text-secondary">{activeData.tradeoff}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-heading-light)] mb-1">Future innovation</h3>
                <p className="text-secondary">{activeData.futureInnovation}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
