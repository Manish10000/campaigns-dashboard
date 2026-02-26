'use client';

import { Campaign } from '@/lib/types';
import { CampaignCard } from './campaign-card';
import { Skeleton } from '@/components/ui/skeleton';

interface CampaignGridProps {
  campaigns: Campaign[];
  isLoading?: boolean;
}

export function CampaignGrid({ campaigns, isLoading }: CampaignGridProps) {
  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <span className="sr-only">Loading campaigns...</span>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="w-full h-48 rounded-lg" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-2/3 h-4" />
            <div className="flex gap-2">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="flex-1 h-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div role="alert" className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Campaigns">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
