'use client';

import { Campaign } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Share2, Bookmark, Twitter, Instagram, Youtube, Music2 } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <article className="rounded-xl overflow-hidden group border border-[var(--dashboard-card-border,#2f3137)] bg-[var(--dashboard-card-bg)] shadow-[var(--dashboard-card-shadow)] transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-black overflow-hidden rounded-t-xl">
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
      
      <div className="p-5">
        <header>
          <h3 className="text-2xl font-bold text-[var(--dashboard-text,#f3f3f3)] mb-1 tracking-wide">{campaign.title}</h3>
          <p className="text-[#ef1818] text-xs mb-3">{`$${campaign.budget} / ${campaign.maxBudget.toLocaleString()} Views`}</p>
          <p className="text-[var(--dashboard-text-muted,#8e939b)] text-xs mb-3">{campaign.views.toLocaleString()} views</p>
          <div className="mb-3 flex items-center justify-between gap-2">
            {campaign.popularityRating ? (
              <p className="text-[var(--dashboard-text-muted,#8e939b)] text-xs">{`Popularity: ${campaign.popularityRating}/5`}</p>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center rounded-md border border-[var(--dashboard-card-border,#4e3a3f)] bg-[var(--dashboard-filter-btn-bg,#23191d)] px-2 py-1 text-[11px] text-[var(--dashboard-text-secondary,#d0d0d0)] whitespace-nowrap transition-colors duration-300">
              {`Published ${getRelativeTime(campaign.publishedDate)}`}
            </span>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.niches.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-2 py-1 rounded-md border border-[var(--dashboard-card-border,#564347)] bg-[var(--dashboard-filter-btn-bg,#2b2227)] text-[var(--dashboard-text-secondary,#d9d9d9)] text-xs transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[var(--dashboard-icon-color,#7d8188)] mb-4">
          <button
            type="button"
            className="w-5 h-5 flex items-center justify-center hover:text-[var(--dashboard-text)] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Open X"
          >
            <Twitter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-5 h-5 flex items-center justify-center hover:text-[var(--dashboard-text)] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Open Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-5 h-5 flex items-center justify-center hover:text-[var(--dashboard-text)] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Open YouTube"
          >
            <Youtube className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-5 h-5 flex items-center justify-center hover:text-[var(--dashboard-text)] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Open TikTok"
          >
            <Music2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Budget Used Bar */}
        <div className="mb-4 border border-[var(--dashboard-card-border,#4a3438)] bg-[var(--dashboard-filter-btn-bg,#23171c)] rounded-lg p-3 transition-colors duration-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-[var(--dashboard-text-secondary,#d6d6d6)]">Budget used</span>
            <span className="text-xs font-bold text-[#ff1a1a]">
              {campaign.budgetUsedPercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[var(--dashboard-icon-color,#5d4b4f)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-[linear-gradient(90deg,#e91111_0%,#aa0c0c_100%)]"
              style={{ width: `${campaign.budgetUsedPercent}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 items-center" role="group" aria-label="Campaign actions">
          <button
            type="button"
            className="w-10 h-10 border border-[var(--dashboard-card-border,#4c4247)] bg-[var(--dashboard-filter-btn-bg,#2a2126)] hover:opacity-80 rounded-lg flex items-center justify-center transition-all text-[var(--dashboard-icon-color)]"
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
            className="w-10 h-10 border border-[var(--dashboard-card-border,#4c4247)] bg-[var(--dashboard-filter-btn-bg,#2a2126)] hover:opacity-80 rounded-lg flex items-center justify-center transition-all text-[var(--dashboard-icon-color)]"
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
            className="flex-1 h-10 bg-[linear-gradient(180deg,#bf0d0d_0%,#950808_100%)] hover:opacity-95 text-white font-semibold rounded-lg border border-[#b21414]"
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
