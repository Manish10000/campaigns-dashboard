'use client';

import { Suspense, useState } from 'react';
import { CampaignSearch } from '@/components/campaign-search';
import { CampaignFilters } from '@/components/campaign-filters';
import { CampaignGrid } from '@/components/campaign-grid';
import { useCampaigns } from '@/hooks/use-campaigns';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';
import { SeedrailLogo } from '@/components/seedrail-logo';
import { ThemeToggle } from '@/components/theme-toggle';

function CampaignPageContent() {
  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('all');
  const [sort, setSort] = useState('newest');
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [popularityFilter, setPopularityFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const { user, signOut, isLoading: authLoading } = useAuth();

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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/FORKOFF.png" 
                alt="FORKOFF" 
                className="h-12 w-auto"
              />
            </div>
            <nav className="hidden md:flex gap-4 sm:gap-8 text-sm items-center">
              <a href="#" className="text-primary-foreground font-medium bg-primary px-3 sm:px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Campaigns
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Performance
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Earnings
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Accounts
              </a>
            </nav>
            {/* Mobile menu button could go here */}
            <div className="md:hidden">
              <button className="w-8 h-8 rounded-lg glass-hover flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="text-xs text-primary-foreground font-bold">
                        {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-foreground">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border-2 border-border shadow-xl">
                <ThemeToggle />
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <section aria-label="Search and filters" className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1">
              <CampaignSearch value={query} onChange={setQuery} />
            </div>
            <CampaignFilters 
              niche={niche} 
              onNicheChange={setNiche} 
              sort={sort} 
              onSortChange={setSort}
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
          <CampaignGrid 
            campaigns={campaigns} 
            isLoading={isLoading}
          />
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Campaign pagination" className="flex justify-center items-center gap-2 mt-8">
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="outline"
              size="sm"
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    page === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent hover:text-accent-foreground'
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
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Next
            </Button>
          </nav>
        )}
      </main>
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
