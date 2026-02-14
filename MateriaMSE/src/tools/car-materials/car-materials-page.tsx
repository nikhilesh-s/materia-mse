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

const zoneShapes: Array<{ key: ZoneKey; x: number; y: number; width: number; height: number }> = [
  { key: 'hood', x: 45, y: 75, width: 130, height: 45 },
  { key: 'engine_block', x: 185, y: 82, width: 80, height: 40 },
  { key: 'chassis', x: 45, y: 128, width: 300, height: 55 },
  { key: 'windows', x: 120, y: 52, width: 150, height: 32 },
  { key: 'brake_disc', x: 352, y: 156, width: 18, height: 18 },
  { key: 'tires', x: 72, y: 186, width: 40, height: 40 },
];

export function CarMaterialsToolPage() {
  const [carType, setCarType] = useState<CarType>('standard');
  const [selectedZone, setSelectedZone] = useState<ZoneKey>('chassis');

  const activeData = useMemo(() => carMaterials[carType][selectedZone], [carType, selectedZone]);

  return (
    <section className="page-section active py-12 md:py-20 bg-[var(--bg-soft-light)] min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Car Parts Materials Map</h1>
        <p className="text-secondary mb-8 max-w-3xl">
          Inspect how material choices shift across standard vehicles, sports platforms, and EV architectures.
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

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8">
          <div className="bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] shadow-sm p-6">
            <p className="text-sm font-medium text-secondary mb-4">Click a zone to view material reasoning.</p>
            <svg viewBox="0 0 420 240" className="w-full h-auto" role="img" aria-label="Car materials silhouette map">
              <path
                d="M30 170 L45 128 L72 128 L95 95 L285 95 L330 120 L360 124 L390 145 L390 185 L30 185 Z"
                fill="rgba(15, 23, 42, 0.08)"
                stroke="rgba(15, 23, 42, 0.25)"
                strokeWidth="2"
              />
              <circle cx="92" cy="186" r="28" fill="rgba(15, 23, 42, 0.15)" />
              <circle cx="315" cy="186" r="28" fill="rgba(15, 23, 42, 0.15)" />

              {zoneShapes.map((zone) => {
                const isActive = zone.key === selectedZone;
                return (
                  <g key={zone.key} onClick={() => setSelectedZone(zone.key)} className="cursor-pointer">
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      rx="8"
                      fill={isActive ? 'rgba(14, 116, 144, 0.3)' : 'rgba(14, 116, 144, 0.14)'}
                      stroke={isActive ? 'rgba(8, 145, 178, 0.95)' : 'rgba(14, 116, 144, 0.45)'}
                      strokeWidth={isActive ? 2.2 : 1.2}
                      className="transition-all"
                    />
                  </g>
                );
              })}

              <text x="12" y="20" fontSize="12" fill="currentColor" className="text-secondary">
                Active: {zoneLabels[selectedZone]}
              </text>
            </svg>

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
            <p className="text-sm text-secondary mb-5">Vehicle profile: {carType === 'ev' ? 'EV' : `${carType[0].toUpperCase()}${carType.slice(1)} car`}</p>

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
