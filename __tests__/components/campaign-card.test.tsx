import { render, screen } from '@testing-library/react'
import { CampaignCard } from '@/components/campaign-card'
import type { Campaign } from '@/lib/types'

// Mock campaign data
const mockCampaign: Campaign = {
  id: '1',
  title: 'Test Campaign',
  description: 'This is a test campaign for unit testing',
  imageUrl: 'https://example.com/image.jpg',
  budget: 1000,
  maxBudget: 5000,
  budgetUsedPercent: 20,
  views: 1500,
  popularityRating: 4,
  publishedDate: '2024-01-15T10:30:00Z',
  createdAt: '2024-01-15T10:30:00Z',
  niches: ['Investing', 'Crypto']
}

describe('CampaignCard', () => {
  it('should render campaign information correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />)
    
    expect(screen.getByText('Test Campaign')).toBeInTheDocument()
    expect(screen.getByText('This is a test campaign for unit testing')).toBeInTheDocument()
    expect(screen.getByText('$1000 / 5,000 Views')).toBeInTheDocument()
    expect(screen.getByText('1,500 views')).toBeInTheDocument()
    expect(screen.getByText('Popularity: 4/5')).toBeInTheDocument()
  })

  it('should display campaign niches', () => {
    render(<CampaignCard campaign={mockCampaign} />)
    
    expect(screen.getByText('Investing')).toBeInTheDocument()
    expect(screen.getByText('Crypto')).toBeInTheDocument()
  })

  it('should show budget used percentage', () => {
    render(<CampaignCard campaign={mockCampaign} />)
    
    expect(screen.getByText('20.0%')).toBeInTheDocument()
  })

  it('should have accessible buttons', () => {
    render(<CampaignCard campaign={mockCampaign} />)
    
    const saveButton = screen.getByLabelText('Save campaign')
    const shareButton = screen.getByLabelText('Share campaign')
    const viewDetailsButton = screen.getByText('View Details')
    
    expect(saveButton).toBeInTheDocument()
    expect(shareButton).toBeInTheDocument()
    expect(viewDetailsButton).toBeInTheDocument()
  })

  it('should use semantic HTML elements', () => {
    const { container } = render(<CampaignCard campaign={mockCampaign} />)
    
    const article = container.querySelector('article')
    const header = container.querySelector('header')
    const heading = container.querySelector('h3')
    
    expect(article).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
  })
})
