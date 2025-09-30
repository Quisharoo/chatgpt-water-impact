import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrivacyBanner from './privacy-banner';

describe('PrivacyBanner', () => {
  it('renders the privacy banner with main message', () => {
    render(<PrivacyBanner />);
    
    expect(screen.getByText(/Your privacy is protected/i)).toBeInTheDocument();
    expect(screen.getByText(/analyzes your data entirely within your browser/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing is ever uploaded or stored on a server/i)).toBeInTheDocument();
  });

  it('displays a "Learn more" button', () => {
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('opens a modal when "Learn more" is clicked', async () => {
    const user = userEvent.setup();
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    await user.click(learnMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText('Your Privacy & Data Security')).toBeInTheDocument();
    });
  });

  it('displays detailed privacy information in the modal', async () => {
    const user = userEvent.setup();
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    await user.click(learnMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText('100% Client-Side Processing')).toBeInTheDocument();
      expect(screen.getByText('How It Works')).toBeInTheDocument();
      expect(screen.getByText('Technical Verification')).toBeInTheDocument();
      expect(screen.getByText(/What We Don't Collect/i)).toBeInTheDocument();
    });
  });

  it('includes verification methods with cross-references', async () => {
    const user = userEvent.setup();
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    await user.click(learnMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Check Network Activity/i)).toBeInTheDocument();
      expect(screen.getByText(/Offline Test/i)).toBeInTheDocument();
      expect(screen.getByText(/Review the Code/i)).toBeInTheDocument();
      // Verify the Open Source Transparency section exists as a heading
      expect(screen.getAllByText(/Open Source Transparency/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('includes primary GitHub link in Open Source Transparency section', async () => {
    const user = userEvent.setup();
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    await user.click(learnMoreButton);
    
    await waitFor(() => {
      // Should have exactly ONE GitHub link in the Open Source Transparency section
      const githubLinks = screen.getAllByRole('link', { name: /inspect the code on github/i });
      expect(githubLinks).toHaveLength(1);
      
      // Verify the link properties
      expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/Quisharoo/chatgpt-water-impact');
      expect(githubLinks[0]).toHaveAttribute('target', '_blank');
      expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('lists what data is not collected', async () => {
    const user = userEvent.setup();
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    await user.click(learnMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Your ChatGPT conversation content/i)).toBeInTheDocument();
      expect(screen.getByText(/File names or metadata/i)).toBeInTheDocument();
      expect(screen.getByText(/Analysis results or statistics/i)).toBeInTheDocument();
    });
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<PrivacyBanner />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton).toBeInTheDocument();
  });
});

