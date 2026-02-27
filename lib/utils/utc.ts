/**
 * UTC Utility Functions
 */

/**
 * Get current UTC timestamp in ISO format
 */
export function getUTCNow(): string {
  return new Date().toISOString();
}

/**
 * Get current UTC timestamp in Unix timestamp (milliseconds)
 */
export function getUTCTimestamp(): number {
  return Date.now();
}

/**
 * Get current UTC timestamp in Unix timestamp (seconds)
 */
export function getUTCTimestampSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Format UTC date to readable string
 */
export function formatUTCDate(date: string | Date, format: 'ISO' | 'readable' | 'date' | 'datetime' = 'ISO'): string {
  const utcDate = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'ISO':
      return utcDate.toISOString();
    case 'readable':
      return utcDate.toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
    case 'date':
      return utcDate.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    case 'datetime':
      return utcDate.toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    default:
      return utcDate.toISOString();
  }
}

/**
 * Convert local date to UTC date
 */
export function toUTC(date: Date): Date {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

/**
 * Convert UTC date to local date
 */
export function fromUTC(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

/**
 * Get UTC timestamp for campaign published date
 */
export function getCampaignUTCTime(publishedDate: string): {
  iso: string;
  readable: string;
  timestamp: number;
  relative: string;
} {
  const date = new Date(publishedDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  let relative = 'Just now';
  if (diffDays > 0) {
    if (diffDays === 1) {
      relative = '1 day ago';
    } else if (diffDays < 30) {
      relative = `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      relative = months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      relative = years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }
  
  return {
    iso: date.toISOString(),
    readable: formatUTCDate(date, 'readable'),
    timestamp: date.getTime(),
    relative
  };
}
