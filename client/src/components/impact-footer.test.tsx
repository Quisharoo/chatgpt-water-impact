import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImpactFooter from './impact-footer';
import * as downloadUtils from '@/lib/download-utils';

const mockData = {
  totalWaterLiters: 25.0,
  totalMessages: 50,
  daysActive: 42,
  waterBottles: 50,
  dailyConsumption: [
    { date: '2023-09-01', waterLiters: 2.5, messages: 5 },
    { date: '2023-09-02', waterLiters: 3.0, messages: 6 },
  ],
  comparisons: {
    showerMinutes: 1.9,
    coffeeCups: 167,
    carWashes: 0.6,
  },
};

describe('ImpactFooter', () => {
  it('renders why this matters section', () => {
    render(<ImpactFooter data={mockData} />);
    expect(screen.getByText('Why This Matters')).toBeInTheDocument();
    expect(screen.getByText(/AI models like ChatGPT require/)).toBeInTheDocument();
  });

  it('renders key facts', () => {
    render(<ImpactFooter data={mockData} />);
    expect(screen.getByText(/Each query uses ~0.5L of water/)).toBeInTheDocument();
    expect(screen.getByText(/Data centers need cooling systems/)).toBeInTheDocument();
  });

  it('renders export buttons', () => {
    render(<ImpactFooter data={mockData} />);
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
    expect(screen.getByText('Export Report')).toBeInTheDocument();
  });

  it('calls downloadCSV when Export CSV button is clicked', () => {
    const downloadCSVSpy = vi.spyOn(downloadUtils, 'downloadCSV');
    render(<ImpactFooter data={mockData} />);
    
    const exportCSVButton = screen.getByText('Export CSV');
    fireEvent.click(exportCSVButton);
    
    expect(downloadCSVSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        ['Date', 'Water Liters', 'Messages'],
        ['2023-09-01', 2.5, 5],
        ['2023-09-02', 3.0, 6],
      ]),
      'chatgpt-water-impact.csv'
    );
  });

  it('calls downloadFile when Export Report button is clicked', () => {
    const downloadFileSpy = vi.spyOn(downloadUtils, 'downloadFile');
    render(<ImpactFooter data={mockData} />);
    
    const exportReportButton = screen.getByText('Export Report');
    fireEvent.click(exportReportButton);
    
    expect(downloadFileSpy).toHaveBeenCalledWith(
      expect.stringContaining('ChatGPT Water Impact Analysis Report'),
      'chatgpt-water-impact-report.txt'
    );
  });
});
