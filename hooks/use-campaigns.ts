import { useState, useEffect } from 'react';
import { Campaign, CampaignsResponse, BudgetTrend } from '@/lib/types';

interface UseCampaignsOptions {
  query?: string;
  niche?: string;
  sort?: string;
  budgetTrend?: BudgetTrend;
  page?: number;
  pageSize?: number;
  dateFilter?: string;
  popularityFilter?: string;
  budgetFilter?: string;
}

export function useCampaigns(options: UseCampaignsOptions = {}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a stable string key from individual values to prevent unnecessary re-fetches
  const optionsKey = `${options.query || ''}|${options.niche || 'all'}|${options.sort || 'newest'}|${options.budgetTrend || 'all'}|${options.page || 1}|${options.pageSize || 6}|${options.dateFilter || 'all'}|${options.popularityFilter || 'all'}|${options.budgetFilter || 'all'}`;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options.query) params.append('q', options.query);
        if (options.niche && options.niche !== 'all') params.append('niche', options.niche);
        if (options.sort) params.append('sort', options.sort);
        if (options.budgetTrend && options.budgetTrend !== 'all') params.append('budgetTrend', options.budgetTrend);
        if (options.page) params.append('page', String(options.page));
        if (options.pageSize) params.append('pageSize', String(options.pageSize));
        if (options.dateFilter && options.dateFilter !== 'all') params.append('dateFilter', options.dateFilter);
        if (options.popularityFilter && options.popularityFilter !== 'all') params.append('popularityFilter', options.popularityFilter);
        if (options.budgetFilter && options.budgetFilter !== 'all') params.append('budgetFilter', options.budgetFilter);

        const response = await fetch(`/api/campaigns?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }

        const data: CampaignsResponse = await response.json();
        setCampaigns(data.campaigns);
        setTotal(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [optionsKey]);

  return { campaigns, total, isLoading, error };
}
