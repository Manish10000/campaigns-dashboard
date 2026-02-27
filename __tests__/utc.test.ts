import { 
  getUTCNow, 
  getUTCTimestamp, 
  getUTCTimestampSeconds, 
  formatUTCDate, 
  toUTC, 
  fromUTC,
  getCampaignUTCTime 
} from '../lib/utils/utc'

describe('UTC Utilities', () => {
  describe('getUTCNow', () => {
    it('should return current UTC timestamp in ISO format', () => {
      const result = getUTCNow()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    })
  })

  describe('getUTCTimestamp', () => {
    it('should return current UTC timestamp in milliseconds', () => {
      const result = getUTCTimestamp()
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThan(0)
    })
  })

  describe('getUTCTimestampSeconds', () => {
    it('should return current UTC timestamp in seconds', () => {
      const result = getUTCTimestampSeconds()
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThan(0)
    })
  })

  describe('formatUTCDate', () => {
    const testDate = new Date('2024-01-15T10:30:00Z')

    it('should format date as ISO string', () => {
      const result = formatUTCDate(testDate, 'ISO')
      expect(result).toBe('2024-01-15T10:30:00.000Z')
    })

    it('should format date as readable string', () => {
      const result = formatUTCDate(testDate, 'readable')
      expect(result).toContain('2024')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
    })

    it('should format date as date only', () => {
      const result = formatUTCDate(testDate, 'date')
      expect(result).toContain('2024')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
    })

    it('should format date as datetime', () => {
      const result = formatUTCDate(testDate, 'datetime')
      expect(result).toContain('2024')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('10:30')
    })
  })

  describe('toUTC and fromUTC', () => {
    it('should convert local date to UTC and back', () => {
      const localDate = new Date('2024-01-15T10:30:00')
      const utcDate = toUTC(localDate)
      const backToLocal = fromUTC(utcDate)
      
      // Round-trip conversion should return to original time
      expect(backToLocal.getTime()).toBe(localDate.getTime())
    })

    it('should handle UTC dates correctly', () => {
      const utcDate = new Date('2024-01-15T10:30:00Z')
      const result = toUTC(utcDate)
      
      // Should return a valid date
      expect(result instanceof Date).toBe(true)
      expect(isNaN(result.getTime())).toBe(false)
    })
  })

  describe('getCampaignUTCTime', () => {
    it('should return campaign time information', () => {
      const publishedDate = '2024-01-15T10:30:00Z'
      const result = getCampaignUTCTime(publishedDate)
      
      expect(result).toHaveProperty('iso')
      expect(result).toHaveProperty('readable')
      expect(result).toHaveProperty('timestamp')
      expect(result).toHaveProperty('relative')
      expect(typeof result.timestamp).toBe('number')
      expect(typeof result.relative).toBe('string')
    })

    it('should show "Just now" for current time', () => {
      const now = new Date().toISOString()
      const result = getCampaignUTCTime(now)
      expect(result.relative).toBe('Just now')
    })

    it('should show "1 day ago" for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const result = getCampaignUTCTime(yesterday)
      expect(result.relative).toBe('1 day ago')
    })
  })
})
