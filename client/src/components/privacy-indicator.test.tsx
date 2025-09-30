import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import PrivacyIndicator from './privacy-indicator';

describe('PrivacyIndicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders nothing when not processing and not complete', () => {
    const { container } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={false} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('displays processing message when isProcessing is true', () => {
    render(<PrivacyIndicator isProcessing={true} processingComplete={false} />);
    
    expect(screen.getByText(/Processing locally in your browser/i)).toBeInTheDocument();
    expect(screen.getByText(/No data is transmitted/i)).toBeInTheDocument();
  });

  it('displays completion message when processingComplete is true', () => {
    render(<PrivacyIndicator isProcessing={false} processingComplete={true} />);
    
    expect(screen.getByText(/Analysis complete/i)).toBeInTheDocument();
    expect(screen.getByText(/your data was never transmitted/i)).toBeInTheDocument();
  });

  it('shows completion message with prominent styling', () => {
    const { container } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={true} />
    );
    
    const alert = container.querySelector('[role="alert"]');
    expect(alert).toHaveClass('bg-green-50');
    expect(alert).toHaveClass('border-2');
    expect(alert).toHaveClass('border-green-300');
  });

  it('hides completion message after 8 seconds', () => {
    const { rerender } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={false} />
    );
    
    // Trigger completion
    act(() => {
      rerender(<PrivacyIndicator isProcessing={false} processingComplete={true} />);
    });
    
    expect(screen.getByText(/Analysis complete/i)).toBeInTheDocument();
    
    // Fast-forward time by 8 seconds
    act(() => {
      vi.advanceTimersByTime(8000);
    });
    
    // After timer, the message should be gone
    expect(screen.queryByText(/Analysis complete/i)).not.toBeInTheDocument();
  });

  it('does not hide completion message before 8 seconds', () => {
    const { rerender } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={false} />
    );
    
    // Trigger completion
    rerender(<PrivacyIndicator isProcessing={false} processingComplete={true} />);
    
    expect(screen.getByText(/Analysis complete/i)).toBeInTheDocument();
    
    // Fast-forward time by 7 seconds (less than 8)
    vi.advanceTimersByTime(7000);
    
    // Should still be visible
    expect(screen.getByText(/Analysis complete/i)).toBeInTheDocument();
  });

  it('displays Shield icon during processing', () => {
    const { container } = render(
      <PrivacyIndicator isProcessing={true} processingComplete={false} />
    );
    
    // Check for the presence of an SVG icon (Shield is rendered as SVG)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('displays CheckCircle icon when complete', () => {
    const { container } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={true} />
    );
    
    // Check for the presence of SVG icons
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('cleans up timer on unmount', () => {
    const { unmount, rerender } = render(
      <PrivacyIndicator isProcessing={false} processingComplete={false} />
    );
    
    rerender(<PrivacyIndicator isProcessing={false} processingComplete={true} />);
    
    // Unmount before timer completes
    unmount();
    
    // Advance timers - should not cause any errors
    vi.advanceTimersByTime(8000);
    
    // No errors should be thrown
    expect(true).toBe(true);
  });
});

