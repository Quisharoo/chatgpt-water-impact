import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SummaryStats from './summary-stats';

const mockData = {
  totalWaterLiters: 25.0,
  totalMessages: 50,
  daysActive: 42,
  waterBottles: 50,
  dailyConsumption: [],
  comparisons: {
    showerMinutes: 1.9,
    coffeeCups: 167,
    carWashes: 0.6,
  },
};

describe('SummaryStats', () => {
  it('renders all four main stat cards', () => {
    render(<SummaryStats data={mockData} />);
    
    expect(screen.getByText('25.0L')).toBeInTheDocument();
    expect(screen.getByText('Water consumed')).toBeInTheDocument();
    
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Days active')).toBeInTheDocument();
    
    expect(screen.getByText('1.9 min')).toBeInTheDocument();
    expect(screen.getByText('Shower time equivalent')).toBeInTheDocument();
  });

  it('renders additional comparisons section', () => {
    render(<SummaryStats data={mockData} />);
    
    expect(screen.getByText('Also equivalent to:')).toBeInTheDocument();
    expect(screen.getByText('167')).toBeInTheDocument();
    expect(screen.getByText('Cups of coffee')).toBeInTheDocument();
    expect(screen.getByText('0.6')).toBeInTheDocument();
    expect(screen.getByText('Car washes')).toBeInTheDocument();
  });

  it('displays correct badges', () => {
    render(<SummaryStats data={mockData} />);
    
    expect(screen.getByText('TOTAL')).toBeInTheDocument();
    expect(screen.getByText('COUNT')).toBeInTheDocument();
    expect(screen.getByText('PERIOD')).toBeInTheDocument();
    expect(screen.getByText('EQUIVALENT')).toBeInTheDocument();
  });

  it('formats numbers correctly', () => {
    const dataWithLargeNumbers = {
      ...mockData,
      totalMessages: 15458,
      comparisons: {
        ...mockData.comparisons,
        coffeeCups: 1234,
      },
    };
    
    render(<SummaryStats data={dataWithLargeNumbers} />);
    
    // Check that large numbers are formatted with commas
    expect(screen.getByText('15,458')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });
});
