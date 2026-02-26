'use client';

import { Button } from '@/components/ui/button';
import { Filter, Twitter, TrendingUp, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { Niche, SortOption } from '@/lib/types';
import { useState } from 'react';

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
  const [showNicheMenu, setShowNicheMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showPageSizeMenu, setShowPageSizeMenu] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempDateFilter, setTempDateFilter] = useState(dateFilter);
  const [tempPopularityFilter, setTempPopularityFilter] = useState(popularityFilter);
  const [tempBudgetFilter, setTempBudgetFilter] = useState(budgetFilter);

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
      {/* Filter Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-2 rounded-lg"
        aria-label="Filter campaigns"
        onClick={() => setShowFilterModal(true)}
      >
        <Filter className="w-4 h-4" />
        Filter
      </Button>

      <Button
        type="button"
        size="sm"
        className={`px-4 font-medium transition-colors rounded-lg ${
          niche === 'all'
            ? 'bg-primary text-primary-foreground hover:bg-primary/80'
            : 'glass-hover'
        }`}
        onClick={() => onNicheChange('all')}
      >
        All
      </Button>

      {/* Sort Dropdown */}
      <div className="relative">
        <label htmlFor="sort-select" className="sr-only">Sort campaigns</label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="flex items-center gap-2 px-3 py-2 glass-hover rounded-lg text-sm bg-background border border-border focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Niche Dropdown */}
      <div className="relative">
        <label htmlFor="niche-select" className="sr-only">Filter by niche</label>
        <select
          id="niche-select"
          value={niche}
          onChange={(e) => onNicheChange(e.target.value)}
          className="flex items-center gap-2 px-3 py-2 glass-hover rounded-lg text-sm bg-background border border-border focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <option value="all">All Niches</option>
          {NICHES.map((nicheOption) => (
            <option key={nicheOption} value={nicheOption}>
              {nicheOption}
            </option>
          ))}
        </select>
      </div>

      {/* Page Size Selector */}
      <div className="relative">
        <label htmlFor="page-size-select" className="sr-only">Page size</label>
        <select
          id="page-size-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="flex items-center gap-2 px-3 py-2 glass-hover rounded-lg text-sm bg-background border border-border focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      <button
        type="button"
        className="w-9 h-9 rounded-lg glass-hover flex items-center justify-center"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-foreground" />
      </button>

      <button
        type="button"
        className="w-9 h-9 rounded-lg glass-hover flex items-center justify-center"
        aria-label="View trending"
      >
        <TrendingUp className="w-4 h-4 text-foreground" />
      </button>

      <button
        type="button"
        className="w-9 h-9 rounded-lg glass-hover flex items-center justify-center"
        aria-label="Share on Instagram"
      >
        <Instagram className="w-4 h-4 text-foreground" />
      </button>

      <button
        type="button"
        className="w-9 h-9 rounded-lg glass-hover flex items-center justify-center"
        aria-label="Share on YouTube"
      >
        <Youtube className="w-4 h-4 text-foreground" />
      </button>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border-2 border-border rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Filter Campaigns</h3>
            
            {/* Published Date Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Published Date</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempDateFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempDateFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempDateFilter === 'increasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempDateFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempDateFilter === 'decreasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempDateFilter('decreasing')}
                >
                  Decreasing
                </button>
              </div>
            </div>

            {/* Popularity Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Popularity</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempPopularityFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempPopularityFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempPopularityFilter === 'increasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempPopularityFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempPopularityFilter === 'decreasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempPopularityFilter('decreasing')}
                >
                  Decreasing
                </button>
              </div>
            </div>

            {/* Budget Used Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Budget Used</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempBudgetFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempBudgetFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempBudgetFilter === 'increasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setTempBudgetFilter('increasing')}
                >
                  Increasing
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    tempBudgetFilter === 'decreasing'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
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
                className="flex-1"
                onClick={() => setShowFilterModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1"
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
