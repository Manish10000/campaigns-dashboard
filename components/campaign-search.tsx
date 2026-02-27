'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface CampaignSearchProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function CampaignSearch({ value, onChange, debounceMs = 1000 }: CampaignSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local value when external value changes (e.g., clear from parent)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout to trigger onChange after debounce period
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setLocalValue('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onChange('');
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      <label htmlFor="campaign-search" className="sr-only">
        Search campaigns
      </label>
      <Input
        id="campaign-search"
        name="search"
        type="text"
        placeholder="Search Campaigns......"
        value={localValue}
        onChange={handleChange}
        className="h-10 rounded-md border border-[var(--dashboard-input-border,#2f3135)] bg-[var(--dashboard-input-bg)] px-4 pr-10 text-sm text-[var(--dashboard-text,#e9e9e9)] placeholder:text-[var(--dashboard-text-muted,#5f6670)] focus:border-[#931010] focus:ring-0 transition-colors"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--dashboard-icon-color,#8f8f8f)] hover:text-[var(--dashboard-text,#f0f0f0)] transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
