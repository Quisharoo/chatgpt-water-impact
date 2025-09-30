import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImpactFooter from './impact-footer';
import * as downloadUtils from '@/lib/download-utils';

const mockToast = vi.fn();

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

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
  beforeEach(() => {
    mockToast.mockClear();
  });
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

  it('calls downloadCSV and shows success toast when Export CSV button is clicked', () => {
    const downloadCSVSpy = vi.spyOn(downloadUtils, 'downloadCSV').mockImplementation(() => {});
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
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "CSV Exported",
      description: "Your water consumption data has been downloaded successfully.",
    });
    
    downloadCSVSpy.mockRestore();
  });

  it('calls downloadFile and shows success toast when Export Report button is clicked', () => {
    const downloadFileSpy = vi.spyOn(downloadUtils, 'downloadFile').mockImplementation(() => {});
    render(<ImpactFooter data={mockData} />);
    
    const exportReportButton = screen.getByText('Export Report');
    fireEvent.click(exportReportButton);
    
    expect(downloadFileSpy).toHaveBeenCalledWith(
      expect.stringContaining('ChatGPT Water Impact Analysis Report'),
      'chatgpt-water-impact-report.txt'
    );
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Report Downloaded",
      description: "Your water impact report has been saved successfully.",
    });
    
    downloadFileSpy.mockRestore();
  });

  it('shows error toast when CSV export fails', () => {
    const downloadCSVSpy = vi.spyOn(downloadUtils, 'downloadCSV').mockImplementation(() => {
      throw new Error('Download failed');
    });
    render(<ImpactFooter data={mockData} />);
    
    const exportCSVButton = screen.getByText('Export CSV');
    fireEvent.click(exportCSVButton);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Export Failed",
      description: "Unable to export CSV. Please try again.",
      variant: "destructive",
    });
    
    downloadCSVSpy.mockRestore();
  });

  it('shows error toast when report export fails', () => {
    const downloadFileSpy = vi.spyOn(downloadUtils, 'downloadFile').mockImplementation(() => {
      throw new Error('Download failed');
    });
    render(<ImpactFooter data={mockData} />);
    
    const exportReportButton = screen.getByText('Export Report');
    fireEvent.click(exportReportButton);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Export Failed",
      description: "Unable to export report. Please try again.",
      variant: "destructive",
    });
    
    downloadFileSpy.mockRestore();
  });
});
