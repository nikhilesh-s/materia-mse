'use client';

import { useMemo, useState } from 'react';
import elements from '@/src/data/elements.json';

type CategoryFilter = 'all' | 'metal' | 'nonmetal' | 'metalloid';

type ElementEntry = {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: 'metal' | 'nonmetal' | 'metalloid';
  density: string;
  meltingPoint: string;
  applications: string[];
  group: number;
  period: number;
};

const categoryTone: Record<ElementEntry['category'], string> = {
  metal: 'bg-slate-100 border-slate-300 text-slate-800 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100',
  nonmetal:
    'bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-700 dark:text-emerald-100',
  metalloid:
    'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-100',
};

const parsedElements = elements as ElementEntry[];

export function PeriodicTableToolPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selected, setSelected] = useState<ElementEntry | null>(null);

  const filteredElements = useMemo(() => {
    if (filter === 'all') return parsedElements;
    return parsedElements.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section className="page-section active py-12 md:py-20 bg-[var(--bg-soft-light)] min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Interactive Periodic Table</h1>
        <p className="text-secondary mb-8 max-w-3xl">
          Explore element classes and inspect engineering-relevant properties and applications. Click any element tile for detailed context.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {(['all', 'metal', 'nonmetal', 'metalloid'] as CategoryFilter[]).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                filter === option
                  ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                  : 'bg-[var(--bg-light)] text-[var(--text-primary-light)] border-[var(--border-light)] hover:border-[var(--accent-primary)]'
              }`}
            >
              {option === 'all' ? 'All categories' : option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-9 sm:grid-cols-12 lg:grid-cols-18 gap-2">
          {Array.from({ length: 7 }, (_, p) => p + 1).map((period) =>
            Array.from({ length: 18 }, (_, g) => g + 1).map((group) => {
              const element = filteredElements.find((item) => item.period === period && item.group === group);

              if (!element) {
                return <div key={`${period}-${group}`} className="h-16 md:h-20 rounded-lg" />;
              }

              return (
                <button
                  key={element.atomicNumber}
                  onClick={() => setSelected(element)}
                  className={`h-16 md:h-20 rounded-lg border p-2 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition ${categoryTone[element.category]}`}
                >
                  <div className="text-[10px] md:text-xs opacity-70">{element.atomicNumber}</div>
                  <div className="text-base md:text-lg font-bold leading-none">{element.symbol}</div>
                  <div className="text-[10px] md:text-xs truncate">{element.name}</div>
                </button>
              );
            })
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-secondary">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-400"></span> Metal</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500"></span> Nonmetal</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-500"></span> Metalloid</span>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-2xl bg-[var(--bg-light)] rounded-xl shadow-2xl border border-[var(--border-light)] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-heading-light)]">{selected.name} ({selected.symbol})</h2>
                <p className="text-secondary">Atomic number: {selected.atomicNumber}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-secondary hover:text-[var(--text-heading-light)] text-xl"
                aria-label="Close modal"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
              <div className="rounded-lg border border-[var(--border-light)] p-4">
                <p className="font-semibold text-[var(--text-heading-light)] mb-2">Material data</p>
                <p><span className="font-medium">Category:</span> {selected.category}</p>
                <p><span className="font-medium">Density:</span> {selected.density}</p>
                <p><span className="font-medium">Melting point:</span> {selected.meltingPoint}</p>
              </div>
              <div className="rounded-lg border border-[var(--border-light)] p-4">
                <p className="font-semibold text-[var(--text-heading-light)] mb-2">Engineering applications</p>
                <ul className="list-disc pl-5 space-y-1 text-secondary">
                  {selected.applications.map((app) => (
                    <li key={app}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
