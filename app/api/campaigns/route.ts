import { NextRequest, NextResponse } from 'next/server';
import { mockCampaigns } from '@/lib/mock-campaigns';
import { Campaign, CampaignsResponse, SortOption, BudgetTrend } from '@/lib/types';

// Helper function to calculate budget trend from history
function calculateBudgetTrend(campaign: Campaign): 'increasing' | 'decreasing' | 'stable' {
  if (!campaign.budgetHistory || campaign.budgetHistory.length < 2) {
    return 'stable';
  }
  
  const sortedHistory = [...campaign.budgetHistory].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const latest = sortedHistory[sortedHistory.length - 1].percent;
  const previous = sortedHistory[sortedHistory.length - 2].percent;
  
  if (latest > previous) return 'increasing';
  if (latest < previous) return 'decreasing';
  return 'stable';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const niche = searchParams.get('niche') || '';
    const sort = (searchParams.get('sort') as SortOption) || 'newest';
    const budgetTrend = (searchParams.get('budgetTrend') as BudgetTrend) || 'all';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);
    const dateFilter = searchParams.get('dateFilter') || 'all';
    const popularityFilter = searchParams.get('popularityFilter') || 'all';
    const budgetFilter = searchParams.get('budgetFilter') || 'all';

    // Filter campaigns
    let filtered = mockCampaigns;

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    // Niche filter
    if (niche && niche !== 'all') {
      filtered = filtered.filter((c) => c.niches.includes(niche as any));
    }

    // Budget trend filter - calculate from history
    if (budgetTrend && budgetTrend !== 'all') {
      filtered = filtered.filter((c) => calculateBudgetTrend(c) === budgetTrend);
    }

    // Apply filters (these will override the main sort if specified)
    let sorted = [...filtered];
    
    // Check if any custom filters are active
    const hasCustomFilters = (dateFilter && dateFilter !== 'all') || 
                           (popularityFilter && popularityFilter !== 'all') || 
                           (budgetFilter && budgetFilter !== 'all');
    
    if (hasCustomFilters) {
      // Apply custom filter logic
      if (dateFilter && dateFilter !== 'all') {
        sorted.sort((a, b) => {
          const dateA = new Date(a.publishedDate).getTime();
          const dateB = new Date(b.publishedDate).getTime();
          return dateFilter === 'increasing' ? dateA - dateB : dateB - dateA;
        });
      } else if (popularityFilter && popularityFilter !== 'all') {
        sorted.sort((a, b) => {
          const popA = a.popularityRating || 0;
          const popB = b.popularityRating || 0;
          return popularityFilter === 'increasing' ? popA - popB : popB - popA;
        });
      } else if (budgetFilter && budgetFilter !== 'all') {
        sorted.sort((a, b) => {
          const budgetA = a.budgetUsedPercent || 0;
          const budgetB = b.budgetUsedPercent || 0;
          return budgetFilter === 'increasing' ? budgetA - budgetB : budgetB - budgetA;
        });
      }
    } else {
      // Apply normal sort logic
      sorted.sort((a, b) => {
        if (sort === 'newest') {
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        } else if (sort === 'oldest') {
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        } else if (sort === 'popular') {
          return (b.popularityRating || 0) - (a.popularityRating || 0);
        }
        return 0;
      });
    }

    // Pagination
    const total = sorted.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const campaigns = sorted.slice(start, end);

    const response: CampaignsResponse = {
      campaigns,
      total,
      page,
      pageSize,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
