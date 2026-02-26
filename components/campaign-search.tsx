'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

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
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
      <Input
        id="campaign-search"
        name="search"
        type="text"
        placeholder="Search Campaigns..."
        value={localValue}
        onChange={handleChange}
        className="pl-11 pr-10 h-10 bg-muted border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
