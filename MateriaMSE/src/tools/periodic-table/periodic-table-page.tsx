'use client';

import { useMemo, useState } from 'react';
import elements from '@/src/data/elements.json';

type Category =
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'metalloid'
  | 'nonmetal'
  | 'noble gas';

type CategoryFilter = 'all' | Category;

type ElementEntry = {
  atomicNumber: number;
  symbol: string;
  name: string;
  group: number; // 1-18
  period: number; // 1-7
  category: Category;
  density: string;
  meltingPoint: string;
  engineeringApplications: string[];
};

const parsedElements = elements as ElementEntry[];

const categoryTone: Record<Category, string> = {
  'alkali metal':
    'bg-amber-100/90 border-amber-300 text-amber-950 dark:bg-amber-900/25 dark:border-amber-700 dark:text-amber-50',
  'alkaline earth metal':
    'bg-orange-100/90 border-orange-300 text-orange-950 dark:bg-orange-900/25 dark:border-orange-700 dark:text-orange-50',
  'transition metal':
    'bg-slate-100/90 border-slate-300 text-slate-950 dark:bg-slate-900/45 dark:border-slate-700 dark:text-slate-50',
  metalloid:
    'bg-sky-100/90 border-sky-300 text-sky-950 dark:bg-sky-900/25 dark:border-sky-700 dark:text-sky-50',
  nonmetal:
    'bg-emerald-100/90 border-emerald-300 text-emerald-950 dark:bg-emerald-900/25 dark:border-emerald-700 dark:text-emerald-50',
  'noble gas':
    'bg-violet-100/90 border-violet-300 text-violet-950 dark:bg-violet-900/25 dark:border-violet-700 dark:text-violet-50',
};

const categoryDot: Record<Category, string> = {
  'alkali metal': 'bg-amber-500',
  'alkaline earth metal': 'bg-orange-500',
  'transition metal': 'bg-slate-500',
  metalloid: 'bg-sky-500',
  nonmetal: 'bg-emerald-500',
  'noble gas': 'bg-violet-500',
};

function titleCase(input: string) {
  return input
    .split(' ')
    .map((p) => (p.length ? p[0].toUpperCase() + p.slice(1) : p))
    .join(' ');
}

export function PeriodicTableToolPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selected, setSelected] = useState<ElementEntry | null>(null);

  const visibleElements = useMemo(() => {
    if (filter === 'all') return parsedElements;
    return parsedElements.filter((el) => el.category === filter);
  }, [filter]);

  const filterOptions = useMemo(() => {
    const ordered: Category[] = [
      'alkali metal',
      'alkaline earth metal',
      'transition metal',
      'metalloid',
      'nonmetal',
      'noble gas',
    ];
    return ['all', ...ordered] as CategoryFilter[];
  }, []);

  return (
    <section className="page-section active bg-[var(--bg-light)] min-h-screen">
      <div
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start max-w-[1400px] mx-auto px-6 py-8"
      >
        <div>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Interactive Periodic Table</h1>
            <p className="text-secondary max-w-3xl">
              Clean, engineering-forward placement by group and period. Select an element to inspect properties and applications.
            </p>
          </header>

          <div className="flex flex-wrap gap-3 mb-8">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  filter === option
                    ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                    : 'bg-[var(--bg-light)] text-[var(--text-primary-light)] border-[var(--border-light)] hover:border-[var(--accent-primary)]'
                }`}
              >
                {option === 'all' ? 'All categories' : titleCase(option)}
              </button>
            ))}
          </div>

          <div className="bg-[var(--bg-light)] rounded-2xl border border-[var(--border-light)] shadow-sm">
            <div className="p-6 md:p-8">
              <div className="overflow-x-auto pb-2">
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(18, minmax(95px, 1fr))',
                    gap: 12,
                    minWidth: 18 * 95,
                  }}
                >
                  {visibleElements.map((el) => (
                    <button
                      key={el.atomicNumber}
                      onClick={() => setSelected(el)}
                      className={`relative min-h-[110px] rounded-xl border p-2.5 shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-md ${
                        categoryTone[el.category]
                      } ${selected?.atomicNumber === el.atomicNumber ? 'ring-2 ring-[var(--accent-primary)]' : ''}`}
                      style={{ gridColumnStart: el.group, gridRowStart: el.period }}
                      aria-label={`${el.name} (${el.symbol})`}
                    >
                      <div className="absolute top-2.5 left-2.5 text-[11px] font-semibold opacity-70">{el.atomicNumber}</div>
                      <div className="h-full flex items-center justify-center">
                        <div className="text-3xl md:text-4xl font-extrabold leading-none tracking-tight">{el.symbol}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-4 text-sm text-secondary">
                {(Object.keys(categoryDot) as Category[]).map((c) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${categoryDot[c]}`} />
                    {titleCase(c)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-[var(--bg-soft-light)] rounded-2xl border border-[var(--border-light)] p-6 shadow-sm min-h-[400px] lg:sticky lg:top-[100px]">
          {!selected ? (
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-heading-light)] mb-2">Select an element</h2>
              <p className="text-secondary">
                Click a tile to view density, melting point, category, and engineering applications.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-heading-light)] leading-tight">
                    {selected.name} <span className="opacity-70">({selected.symbol})</span>
                  </h2>
                  <p className="text-secondary text-sm">
                    Atomic #{selected.atomicNumber} · Group {selected.group} · Period {selected.period}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-secondary hover:text-[var(--text-heading-light)] text-xl"
                  aria-label="Clear selection"
                >
                  <i className="ti ti-x" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
                  <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Properties</p>
                  <div className="space-y-1 text-secondary">
                    <p>
                      <span className="font-medium text-[var(--text-heading-light)]">Category:</span> {titleCase(selected.category)}
                    </p>
                    <p>
                      <span className="font-medium text-[var(--text-heading-light)]">Density:</span> {selected.density}
                    </p>
                    <p>
                      <span className="font-medium text-[var(--text-heading-light)]">Melting point:</span> {selected.meltingPoint}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4">
                  <p className="text-sm font-semibold text-[var(--text-heading-light)] mb-2">Engineering applications</p>
                  <ul className="list-disc pl-5 space-y-1 text-secondary">
                    {selected.engineeringApplications.map((app) => (
                      <li key={app}>{app}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
