'use client';

import { Button } from '@/components/ui/button';
import { Filter, Twitter, Instagram, Youtube, Music2 } from 'lucide-react';
import { Niche, SortOption } from '@/lib/types';
import { useEffect, useState } from 'react';

const NICHES: Niche[] = ['Investing', 'Crypto', 'Web3', 'AI', 'Gaming', 'SaaS', 'Healthcare', 'Education'];
const SORT_OPTIONS = ['newest', 'oldest', 'popular'];

interface CampaignFiltersProps {
  niche: string;
  onNicheChange: (niche: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  dateFilter?: string;
  onDateFilterChange?: (filter: string) => void;
  popularityFilter?: string;
  onPopularityFilterChange?: (filter: string) => void;
  budgetFilter?: string;
  onBudgetFilterChange?: (filter: string) => void;
}

export function CampaignFilters({ 
  niche, 
  onNicheChange, 
  sort, 
  onSortChange, 
  pageSize, 
  onPageSizeChange,
  dateFilter = 'all',
  onDateFilterChange,
  popularityFilter = 'all',
  onPopularityFilterChange,
  budgetFilter = 'all',
  onBudgetFilterChange
}: CampaignFiltersProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempDateFilter, setTempDateFilter] = useState(dateFilter);
  const [tempPopularityFilter, setTempPopularityFilter] = useState(popularityFilter);
  const [tempBudgetFilter, setTempBudgetFilter] = useState(budgetFilter);

  useEffect(() => {
    setTempDateFilter(dateFilter);
  }, [dateFilter]);

  useEffect(() => {
    setTempPopularityFilter(popularityFilter);
  }, [popularityFilter]);

  useEffect(() => {
    setTempBudgetFilter(budgetFilter);
  }, [budgetFilter]);

  useEffect(() => {
    if (!showFilterModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowFilterModal(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showFilterModal]);

  void pageSize;
  void onPageSizeChange;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-10 px-4 rounded-md border border-[var(--dashboard-button-border,#2e2f34)] bg-[var(--dashboard-button-bg)] text-[var(--dashboard-text,#f1f1f1)] hover:opacity-80 transition-all"
          aria-label="Filter campaigns"
          onClick={() => setShowFilterModal(true)}
        >
          <Filter className="w-4 h-4 text-[#c10808]" />
          Filter
        </Button>

        <Button
          type="button"
          size="sm"
          className={`h-10 px-5 rounded-md font-medium transition-all ${
            niche === 'all'
              ? 'bg-[linear-gradient(180deg,#ba0b0b_0%,#8f0707_100%)] text-white'
              : 'border border-[var(--dashboard-input-border,#2f3135)] bg-[var(--dashboard-filter-btn-bg,#121418)] text-[var(--dashboard-text-secondary,#d3d3d3)] hover:opacity-80'
          }`}
          onClick={() => onNicheChange('all')}
        >
          All
        </Button>

        <button
          type="button"
          className="w-10 h-10 rounded-md border border-[var(--dashboard-input-border,#2d2f34)] bg-[var(--dashboard-filter-btn-bg,#13151a)] hover:opacity-80 flex items-center justify-center transition-all"
          aria-label="Share on X"
        >
          <Twitter className="w-4 h-4 text-[var(--dashboard-icon-color,#a2a6ad)]" />
        </button>

        <button
          type="button"
          className="w-10 h-10 rounded-md border border-[var(--dashboard-input-border,#2d2f34)] bg-[var(--dashboard-filter-btn-bg,#13151a)] hover:opacity-80 flex items-center justify-center transition-all"
          aria-label="Share on TikTok"
        >
          <Music2 className="w-4 h-4 text-[var(--dashboard-icon-color,#a2a6ad)]" />
        </button>

        <button
          type="button"
          className="w-10 h-10 rounded-md border border-[var(--dashboard-input-border,#2d2f34)] bg-[var(--dashboard-filter-btn-bg,#13151a)] hover:opacity-80 flex items-center justify-center transition-all"
          aria-label="Share on Instagram"
        >
          <Instagram className="w-4 h-4 text-[var(--dashboard-icon-color,#a2a6ad)]" />
        </button>

        <button
          type="button"
          className="w-10 h-10 rounded-md border border-[var(--dashboard-input-border,#2d2f34)] bg-[var(--dashboard-filter-btn-bg,#13151a)] hover:opacity-80 flex items-center justify-center transition-all"
          aria-label="Share on YouTube"
        >
          <Youtube className="w-4 h-4 text-[var(--dashboard-icon-color,#a2a6ad)]" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">Sort campaigns</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-10 min-w-[126px] px-3 rounded-md border border-[var(--dashboard-select-border,#3a1414)] bg-[var(--dashboard-select-bg)] text-sm text-[var(--dashboard-text,#ededed)] focus:ring-0 focus:border-[#ab1010] transition-colors"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="niche-select" className="sr-only">Filter by niche</label>
          <select
            id="niche-select"
            value={niche}
            onChange={(e) => onNicheChange(e.target.value)}
            className="h-10 min-w-[126px] px-3 rounded-md border border-[var(--dashboard-select-border,#3a1414)] bg-[var(--dashboard-select-bg)] text-sm text-[var(--dashboard-text,#ededed)] focus:ring-0 focus:border-[#ab1010] transition-colors"
          >
            <option value="all">All Niches</option>
            {NICHES.map((nicheOption) => (
              <option key={nicheOption} value={nicheOption}>
                {nicheOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--dashboard-modal-bg,#0d0f13)] border border-[var(--dashboard-modal-border,#2e3238)] rounded-xl p-6 max-w-md w-full shadow-lg text-[var(--dashboard-text,white)] transition-colors">
            <h3 className="text-lg font-semibold mb-4">Filter Campaigns</h3>
            
            {/* Published Date Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-[var(--dashboard-text-muted)] mb-2 block">Published Date</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempDateFilter === 'all'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempDateFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempDateFilter === 'increasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempDateFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempDateFilter === 'decreasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempDateFilter('decreasing')}
                >
                  Decreasing
                </button>
              </div>
            </div>

            {/* Popularity Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-[var(--dashboard-text-muted)] mb-2 block">Popularity</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempPopularityFilter === 'all'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempPopularityFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempPopularityFilter === 'increasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempPopularityFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempPopularityFilter === 'decreasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempPopularityFilter('decreasing')}
                >
                  Decreasing
                </button>
              </div>
            </div>

            {/* Budget Used Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-[var(--dashboard-text-muted)] mb-2 block">Budget Used</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempBudgetFilter === 'all'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempBudgetFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempBudgetFilter === 'increasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempBudgetFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    tempBudgetFilter === 'decreasing'
                      ? 'bg-[#aa0d0d] text-white'
                      : 'border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80'
                  }`}
                  onClick={() => setTempBudgetFilter('decreasing')}
                >
                  Decreasing
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 border border-[var(--dashboard-filter-btn-border,#2f3238)] bg-[var(--dashboard-filter-btn-bg,#171a20)] text-[var(--dashboard-text)] hover:opacity-80"
                onClick={() => setShowFilterModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-[#aa0d0d] hover:bg-[#910a0a] text-white"
                onClick={() => {
                  onDateFilterChange?.(tempDateFilter);
                  onPopularityFilterChange?.(tempPopularityFilter);
                  onBudgetFilterChange?.(tempBudgetFilter);
                  setShowFilterModal(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
