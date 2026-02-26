'use client';

import { Campaign } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Share2, Bookmark } from 'lucide-react';

// Helper function to get relative time
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const budgetDisplay = `$${campaign.budget} / ${campaign.maxBudget.toLocaleString()} Views`;

  return (
    <article className="rounded-2xl glass-glow overflow-hidden hover:glass-glow transition-all duration-300 group hover:border-white/30">
      {/* Image Container */}
      <div className="relative w-full h-52 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {campaign.imageUrl ? (
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span>No image available</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <header>
          <h3 className="text-lg font-bold text-foreground mb-2">{campaign.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{campaign.description}</p>
        </header>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{budgetDisplay}</span>
            <span className="text-xs text-muted-foreground">{campaign.views.toLocaleString()} views</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-accent font-medium">Popularity: {campaign.popularityRating}/5</span>
            <span>•</span>
            <span>Published {getRelativeTime(campaign.publishedDate)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {campaign.niches.slice(0, 3).map((niche) => (
            <span
              key={niche}
              className="inline-block px-3 py-1.5 glass-hover text-foreground text-xs rounded-lg font-medium"
            >
              {niche}
            </span>
          ))}
        </div>

        {/* Budget Used Bar */}
        <div className="mb-5 glass-hover rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Budget used</span>
            <span className="text-sm font-bold text-accent">
              {campaign.budgetUsedPercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 progress-bar-bg rounded-full overflow-hidden">
            <div
              className="h-full progress-bar-fill rounded-full transition-all duration-500 ease-out"
              style={{ width: `${campaign.budgetUsedPercent}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2" role="group" aria-label="Campaign actions">
          <button
            type="button"
            className="flex-1 px-3 py-2.5 glass-hover rounded-lg flex items-center justify-center focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Save campaign"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="flex-1 px-3 py-2.5 glass-hover rounded-lg flex items-center justify-center focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Share campaign"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <Button
            type="button"
            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold rounded-lg transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
