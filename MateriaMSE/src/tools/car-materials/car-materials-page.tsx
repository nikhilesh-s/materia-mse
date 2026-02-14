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
  carType,
  selected,
  hovered,
  onHover,
  onSelect,
}: {
  carType: CarType;
  selected: ZoneKey;
  hovered: ZoneKey | null;
  onHover: (zone: ZoneKey | null) => void;
  onSelect: (zone: ZoneKey) => void;
}) {
  const hot = (z: ZoneKey) => hovered === z || selected === z;

  const modeAccent =
    carType === 'sports'
      ? { stroke: 'rgba(239, 68, 68, 0.95)', fill: 'rgba(239, 68, 68, 0.18)', glow: 'url(#glowSports)' }
      : carType === 'ev'
        ? { stroke: 'rgba(59, 130, 246, 0.95)', fill: 'rgba(59, 130, 246, 0.18)', glow: 'url(#glowEv)' }
        : { stroke: 'rgba(8, 145, 178, 0.95)', fill: 'rgba(8, 145, 178, 0.18)', glow: 'url(#glowStandard)' };

  const hoverFill = (z: ZoneKey) => (hot(z) ? modeAccent.fill : 'rgba(8, 145, 178, 0.06)');
  const hoverStroke = (z: ZoneKey) => (hot(z) ? modeAccent.stroke : 'rgba(8, 145, 178, 0.22)');
  const hoverStrokeW = (z: ZoneKey) => (hot(z) ? 2.6 : 1.3);
  const hoverFilter = (z: ZoneKey) => (hot(z) ? modeAccent.glow : undefined);

  // Global silhouette styling (dark teal body as requested)
  const bodyFill = 'rgba(6, 95, 108, 0.46)';
  const bodyStroke = 'rgba(6, 95, 108, 0.85)';

  const wheelR = carType === 'sports' ? 42 : 38; // ~10% larger for sports

  // Mode-specific body shapes (structural differences)
  const bodyPathStandard =
    'M78 176 L112 136 C135 110 176 96 214 96 L360 96 C414 96 460 110 508 138 L566 150 C592 156 617 165 642 178 L662 190 L662 212 C662 224 652 234 640 234 L610 234 C604 207 582 186 554 186 C526 186 504 207 498 234 L260 234 C254 207 232 186 204 186 C176 186 154 207 148 234 L104 234 C90 234 78 222 78 208 Z';

  const bodyPathSports =
    'M78 176 L122 130 C156 98 214 88 268 88 L398 88 C456 88 510 108 546 140 L598 156 C620 162 642 170 662 182 L674 192 L674 210 C674 226 660 240 644 240 L612 240 C606 206 580 182 548 182 C516 182 490 206 484 240 L268 240 C262 206 236 182 204 182 C172 182 146 206 140 240 L108 240 C90 240 78 226 78 208 Z';

  const bodyPathEv =
    'M78 176 L110 136 C132 112 172 96 210 96 L378 96 C438 96 492 114 538 146 L604 164 C628 170 648 178 666 190 L678 200 L678 214 C678 230 664 242 648 242 L612 242 C606 210 582 186 552 186 C522 186 498 210 492 242 L270 242 C264 210 240 186 210 186 C180 186 156 210 150 242 L110 242 C92 242 78 228 78 210 Z';

  const bodyPath = carType === 'sports' ? bodyPathSports : carType === 'ev' ? bodyPathEv : bodyPathStandard;

  // Click regions (keep IDs exactly as requested)
  // Keep windows separated from hood (avoid overlap).
  const windowsPathStandard = 'M306 108 L392 108 C440 108 478 122 510 146 L494 164 L294 164 L278 130 Z';
  const windowsPathSports = 'M320 102 L420 102 C466 102 504 120 532 146 L516 164 L308 164 L292 128 Z';
  const windowsPathEv = 'M306 110 L404 110 C456 110 498 128 532 156 L512 170 L294 170 L278 134 Z';
  const windowsPath = carType === 'sports' ? windowsPathSports : carType === 'ev' ? windowsPathEv : windowsPathStandard;

  const hoodPathStandard = 'M140 176 L168 144 C188 124 220 112 258 112 L296 112 L296 176 Z';
  const hoodPathSports = 'M140 176 L182 140 C210 116 248 106 300 106 L316 106 L316 176 Z';
  const hoodPathEv = 'M140 176 L160 148 C178 128 210 116 250 116 L294 116 L294 176 Z';
  const hoodPath = carType === 'sports' ? hoodPathSports : carType === 'ev' ? hoodPathEv : hoodPathStandard;

  const enginePath = 'M236 166 L286 166 L300 182 L300 210 L224 210 L224 182 Z';

  return (
    <svg viewBox="0 0 720 270" className="w-full h-auto" role="img" aria-label="Car materials side-profile map">
      <defs>
        <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
        </filter>
        <filter id="glowStandard" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(8,145,178,0.45)" />
        </filter>
        <filter id="glowSports" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(239,68,68,0.45)" />
        </filter>
        <filter id="glowEv" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="rgba(59,130,246,0.45)" />
        </filter>
        <filter id="evGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(59,130,246,0.30)" />
        </filter>
      </defs>

      <g filter="url(#carShadow)">
        {/* Filled body silhouette */}
        <path d={bodyPath} fill={bodyFill} stroke={bodyStroke} strokeWidth="2.5" />

        {/* Standard/Sports: subtle grille cue (EV omits for smooth front) */}
        {carType !== 'ev' && (
          <path
            d="M620 186 L652 196"
            fill="none"
            stroke={carType === 'sports' ? 'rgba(239,68,68,0.35)' : 'rgba(6,95,108,0.55)'}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}

        {/* Windows base (slightly lighter transparent fill) */}
        <path d={windowsPath} fill="rgba(248, 250, 253, 0.22)" stroke="rgba(248, 250, 253, 0.28)" strokeWidth="1.8" />

        {/* Wheels base (thicker, grounded) */}
        <ellipse cx="204" cy="246" rx={wheelR + 10} ry="8" fill="rgba(0,0,0,0.10)" />
        <ellipse cx="552" cy="246" rx={wheelR + 10} ry="8" fill="rgba(0,0,0,0.10)" />

        <circle cx="204" cy="234" r={wheelR} fill="rgba(11, 17, 32, 0.20)" stroke="rgba(11, 17, 32, 0.55)" strokeWidth="8" />
        <circle cx="552" cy="234" r={wheelR} fill="rgba(11, 17, 32, 0.20)" stroke="rgba(11, 17, 32, 0.55)" strokeWidth="8" />
        <circle cx="204" cy="234" r={Math.max(16, wheelR - 22)} fill="rgba(248, 250, 253, 0.10)" />
        <circle cx="552" cy="234" r={Math.max(16, wheelR - 22)} fill="rgba(248, 250, 253, 0.10)" />

        {/* EV: battery highlight + electric accent line under chassis */}
        {carType === 'ev' && (
          <g filter="url(#evGlow)">
            <rect x="306" y="198" width="210" height="26" rx="12" fill="rgba(59,130,246,0.14)" stroke="rgba(59,130,246,0.50)" />
            <path d="M130 226 L648 226" stroke="rgba(59,130,246,0.32)" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {/* Sports: subtle red accent near hood */}
        {carType === 'sports' && (
          <path
            d="M150 176 L312 176"
            fill="none"
            stroke="rgba(239, 68, 68, 0.35)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}

        {/* Clickable regions (hover/active overlays) */}

        {/* Chassis */}
        <g
          id="chassis"
          className="cursor-pointer"
          onMouseEnter={() => onHover('chassis')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect('chassis')}
        >
          <path
            d="M110 190 L648 190 L670 214 C670 232 656 244 638 244 L612 244 C606 212 582 186 552 186 C522 186 498 212 492 244 L270 244 C264 212 240 186 210 186 C180 186 156 212 150 244 L110 244 C92 244 78 230 78 212 Z"
            fill={hoverFill('chassis')}
            stroke={hoverStroke('chassis')}
            strokeWidth={hoverStrokeW('chassis')}
            filter={hoverFilter('chassis')}
          />
        </g>

        {/* Hood */}
        <g
          id="hood"
          className="cursor-pointer"
          onMouseEnter={() => onHover('hood')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect('hood')}
        >
          <path
            d={hoodPath}
            fill={hoverFill('hood')}
            stroke={hoverStroke('hood')}
            strokeWidth={hoverStrokeW('hood')}
            filter={hoverFilter('hood')}
          />
        </g>

        {/* Engine block */}
        <g
          id="engine_block"
          className="cursor-pointer"
          onMouseEnter={() => onHover('engine_block')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect('engine_block')}
        >
          <path
            d={enginePath}
            fill={hoverFill('engine_block')}
            stroke={hoverStroke('engine_block')}
            strokeWidth={hoverStrokeW('engine_block')}
            filter={hoverFilter('engine_block')}
          />
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
            d={windowsPath}
            fill={hot('windows') ? modeAccent.fill : 'rgba(248, 250, 253, 0.08)'}
            stroke={hoverStroke('windows')}
            strokeWidth={hoverStrokeW('windows')}
            filter={hoverFilter('windows')}
          />
        </g>

        {/* Tires */}
        <g
          id="tires"
          className="cursor-pointer"
          onMouseEnter={() => onHover('tires')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect('tires')}
        >
          <circle
            cx="204"
            cy="234"
            r={wheelR}
            fill="transparent"
            stroke={hoverStroke('tires')}
            strokeWidth={hot('tires') ? 4.5 : 2}
            filter={hoverFilter('tires')}
          />
          <circle
            cx="552"
            cy="234"
            r={wheelR}
            fill="transparent"
            stroke={hoverStroke('tires')}
            strokeWidth={hot('tires') ? 4.5 : 2}
            filter={hoverFilter('tires')}
          />
        </g>

        {/* Brake disc (front wheel) */}
        <g
          id="brake_disc"
          className="cursor-pointer"
          onMouseEnter={() => onHover('brake_disc')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect('brake_disc')}
        >
          <circle
            cx="552"
            cy="234"
            r="14"
            fill={hot('brake_disc') ? modeAccent.fill : 'rgba(248, 250, 253, 0.10)'}
            stroke={hoverStroke('brake_disc')}
            strokeWidth={hoverStrokeW('brake_disc')}
            filter={hoverFilter('brake_disc')}
          />
        </g>
      </g>

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
    <section className="page-section active bg-[var(--bg-light)] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start max-w-[1400px] mx-auto px-6 py-8">
        <div>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Car Parts Materials Map</h1>
            <p className="text-secondary max-w-3xl">
              Compare material decisions across standard vehicles, sports platforms, and EV architectures. Hover to highlight zones and click to
              inspect tradeoffs.
            </p>
          </header>

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

          <div className="bg-[var(--bg-light)] rounded-2xl border border-[var(--border-light)] shadow-sm p-6 md:p-8">
            <p className="text-sm font-medium text-secondary mb-4">Hover to highlight. Click a region to update the sidebar.</p>
            <CarSilhouetteSvg
              carType={carType}
              selected={selectedZone}
              hovered={hoveredZone}
              onHover={setHoveredZone}
              onSelect={setSelectedZone}
            />

            <div className="mt-7 flex flex-wrap gap-2">
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
        </div>

        <aside className="bg-[var(--bg-soft-light)] rounded-2xl border border-[var(--border-light)] p-6 shadow-sm min-h-[400px] lg:sticky lg:top-[100px]">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[var(--text-heading-light)] mb-1">{zoneLabels[selectedZone]}</h2>
            <p className="text-sm text-secondary">
              Mode: {carType === 'ev' ? 'EV' : `${carType[0].toUpperCase()}${carType.slice(1)} car`}
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
              <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Primary material</p>
              <p className="text-secondary">{activeData.primaryMaterial}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
              <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Why it is chosen</p>
              <p className="text-secondary">{activeData.whyChosen}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
              <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Tradeoff</p>
              <p className="text-secondary">{activeData.tradeoff}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
              <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Future innovation</p>
              <p className="text-secondary">{activeData.futureInnovation}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
