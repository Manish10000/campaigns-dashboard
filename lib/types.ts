export type Niche = 'Investing' | 'Crypto' | 'Web3' | 'AI' | 'Gaming' | 'SaaS' | 'Healthcare' | 'Education';
export type BudgetTrend = 'all' | 'increasing' | 'decreasing';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  budget: number;
  maxBudget: number;
  views: number;
  niches: Niche[];
  budgetUsedPercent: number;
  budgetHistory?: { percent: number; date: string }[];
  popularityRating?: number; // 1-100 popularity score
  publishedDate: string;
  createdAt: string;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  pageSize: number;
}

export type SortOption = 'newest' | 'oldest' | 'popular';
