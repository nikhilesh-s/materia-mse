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
    'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-50',
  'alkaline earth metal':
    'bg-orange-100 border-orange-300 text-orange-900 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-50',
  'transition metal':
    'bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50',
  metalloid:
    'bg-sky-100 border-sky-300 text-sky-900 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-50',
  nonmetal:
    'bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-50',
  'noble gas':
    'bg-violet-100 border-violet-300 text-violet-900 dark:bg-violet-900/30 dark:border-violet-700 dark:text-violet-50',
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
    <section className="page-section active py-12 md:py-20 bg-[var(--bg-soft-light)] min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Interactive Periodic Table</h1>
        <p className="text-secondary mb-8 max-w-3xl">
          A structured, engineering-forward periodic table. Elements are positioned by group (columns) and period (rows). Click a tile for
          details.
        </p>

        <div className="flex flex-wrap gap-3 mb-7">
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

        <div className="bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] shadow-sm p-4 md:p-6">
          <div className="overflow-x-auto">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                minWidth: 980,
              }}
            >
              {visibleElements.map((el) => (
                <button
                  key={el.atomicNumber}
                  onClick={() => setSelected(el)}
                  className={`h-16 md:h-20 rounded-lg border p-2 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition ${
                    categoryTone[el.category]
                  }`}
                  style={{ gridColumnStart: el.group, gridRowStart: el.period }}
                  aria-label={`${el.name} (${el.symbol})`}
                >
                  <div className="text-[10px] md:text-xs opacity-70">{el.atomicNumber}</div>
                  <div className="text-base md:text-lg font-bold leading-none">{el.symbol}</div>
                  <div className="text-[10px] md:text-xs truncate">{el.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-secondary">
            {(Object.keys(categoryDot) as Category[]).map((c) => (
              <span key={c} className="inline-flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${categoryDot[c]}`} />
                {titleCase(c)}
              </span>
            ))}
          </div>
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
                <h2 className="text-2xl font-bold text-[var(--text-heading-light)]">
                  {selected.name} ({selected.symbol})
                </h2>
                <p className="text-secondary">
                  Atomic number: {selected.atomicNumber} · Group {selected.group} · Period {selected.period}
                </p>
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
                <p className="font-semibold text-[var(--text-heading-light)] mb-2">Properties</p>
                <p>
                  <span className="font-medium">Category:</span> {titleCase(selected.category)}
                </p>
                <p>
                  <span className="font-medium">Density:</span> {selected.density}
                </p>
                <p>
                  <span className="font-medium">Melting point:</span> {selected.meltingPoint}
                </p>
              </div>
              <div className="rounded-lg border border-[var(--border-light)] p-4">
                <p className="font-semibold text-[var(--text-heading-light)] mb-2">Engineering applications</p>
                <ul className="list-disc pl-5 space-y-1 text-secondary">
                  {selected.engineeringApplications.map((app) => (
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
