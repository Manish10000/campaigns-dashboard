'use client';

import { Suspense, useState } from 'react';
import { CampaignSearch } from '@/components/campaign-search';
import { CampaignFilters } from '@/components/campaign-filters';
import { CampaignGrid } from '@/components/campaign-grid';
import { useCampaigns } from '@/hooks/use-campaigns';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Sun, Moon } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { useDashboardTheme } from './layout';

function CampaignPageContent() {
  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('all');
  const [sort, setSort] = useState('newest');
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [popularityFilter, setPopularityFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useDashboardTheme();

  const { campaigns, total, isLoading } = useCampaigns({
    query,
    niche,
    sort,
    page,
    pageSize,
    dateFilter,
    popularityFilter,
    budgetFilter,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="min-h-screen bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 sm:py-7">
        {/* Header */}
        <div className="sticky top-4 z-40 rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-header-bg)] shadow-[var(--dashboard-shadow)] transition-colors duration-300">
          <div className="px-4 sm:px-6 py-3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="justify-self-start flex items-center gap-3">
                <BrandLogo />
             
              </div>
              <nav className="hidden md:flex gap-3 text-sm items-center justify-self-center">
                <a
                  href="#"
                  className="px-6 py-2 rounded-md bg-[linear-gradient(180deg,#ba0b0b_0%,#8f0707_100%)] text-white shadow-[0_0_20px_rgba(185,11,11,0.35)]"
                >
                  Campaigns
                </a>
                <a href="#" className="px-3 py-2 text-[var(--dashboard-text-secondary)] hover:text-[var(--dashboard-text)] transition-colors">Performance</a>
                <a href="#" className="px-3 py-2 text-[var(--dashboard-text-secondary)] hover:text-[var(--dashboard-text)] transition-colors">Earnings</a>
                <a href="#" className="px-3 py-2 text-[var(--dashboard-text-secondary)] hover:text-[var(--dashboard-text)] transition-colors">Accounts</a>
              </nav>
              <div className="justify-self-end flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-lg border border-[var(--dashboard-border-light)] bg-[var(--dashboard-button-bg)] flex items-center justify-center hover:opacity-80 transition-all"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-lg border border-[var(--dashboard-border-light)] bg-[var(--dashboard-button-bg)] px-3 py-1.5 hover:opacity-90 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-[#a90b0b] flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                      ) : (
                        <span className="text-[10px] text-white font-bold">
                          {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-[var(--dashboard-text)]">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className={`w-48 shadow-lg ${
                    isDarkMode 
                      ? 'bg-[#0d0f13] border-[#2e3238] text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <DropdownMenuItem disabled className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={isDarkMode ? 'bg-[#2e3238]' : 'bg-gray-200'} />
                  <DropdownMenuItem 
                    onClick={signOut} 
                    className={`text-red-500 cursor-pointer ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1100px] mx-auto px-2 sm:px-0 py-8 sm:py-10">
        {/* Search and Filters */}
          <section aria-label="Search and filters" className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1">
                <CampaignSearch value={query} onChange={setQuery} />
              </div>
              <CampaignFilters
                niche={niche}
                onNicheChange={(nextNiche) => {
                  setNiche(nextNiche);
                  setPage(1);
                }}
                sort={sort}
                onSortChange={(nextSort) => {
                  setSort(nextSort);
                  setDateFilter('all');
                  setPopularityFilter('all');
                  setBudgetFilter('all');
                  setPage(1);
                }}
                pageSize={pageSize}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setPage(1);
                }}
                dateFilter={dateFilter}
                onDateFilterChange={setDateFilter}
                popularityFilter={popularityFilter}
                onPopularityFilterChange={setPopularityFilter}
                budgetFilter={budgetFilter}
                onBudgetFilterChange={setBudgetFilter}
              />
            </div>
          </section>

          {/* Campaign Grid */}
          <section aria-label="Campaign results">
            <CampaignGrid campaigns={campaigns} isLoading={isLoading} />
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Campaign pagination" className="flex justify-center items-center gap-2 mt-8">
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                variant="outline"
                size="sm"
                className="border-[var(--dashboard-border-light)] bg-[var(--dashboard-button-bg)] text-[var(--dashboard-text)] hover:opacity-80 transition-colors"
              >
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-[#a30808] text-white'
                        : 'border border-[var(--dashboard-border-light)] bg-[var(--dashboard-button-bg)] text-[var(--dashboard-text-secondary)] hover:opacity-80'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={page === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                variant="outline"
                size="sm"
                className="border-[var(--dashboard-border-light)] bg-[var(--dashboard-button-bg)] text-[var(--dashboard-text)] hover:opacity-80 transition-colors"
              >
                Next
              </Button>
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CampaignsPage() {
  return (
    <Suspense>
      <CampaignPageContent />
    </Suspense>
  );
}
