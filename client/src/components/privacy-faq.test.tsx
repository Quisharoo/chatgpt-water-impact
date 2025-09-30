import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrivacyFAQ from './privacy-faq';

describe('PrivacyFAQ', () => {
  it('renders the FAQ section with title', () => {
    render(<PrivacyFAQ />);
    
    expect(screen.getByText('Privacy & Security FAQ')).toBeInTheDocument();
    expect(screen.getByText('Your questions about data security answered')).toBeInTheDocument();
  });

  it('displays all FAQ questions', () => {
    render(<PrivacyFAQ />);
    
    expect(screen.getByText(/Is my ChatGPT data sent to a server/i)).toBeInTheDocument();
    expect(screen.getByText(/Is my data stored anywhere/i)).toBeInTheDocument();
    expect(screen.getByText(/How can I verify no data is transmitted/i)).toBeInTheDocument();
    expect(screen.getByText(/Is this application open source/i)).toBeInTheDocument();
    expect(screen.getByText(/What information do you collect/i)).toBeInTheDocument();
    expect(screen.getByText(/Why should I trust this tool/i)).toBeInTheDocument();
  });

  it('expands FAQ item when clicked', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const firstQuestion = screen.getByText(/Is my ChatGPT data sent to a server/i);
    await user.click(firstQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/Files never leave your device/i)).toBeInTheDocument();
    });
  });

  it('shows detailed verification methods', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const verificationQuestion = screen.getByText(/How can I verify no data is transmitted/i);
    await user.click(verificationQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/Method 1: Check Your Network Activity/i)).toBeInTheDocument();
      expect(screen.getByText(/Method 2: Offline Test/i)).toBeInTheDocument();
      expect(screen.getByText(/Method 3: Inspect the Source Code/i)).toBeInTheDocument();
    });
  });

  it('includes step-by-step network verification guide', async () => {
    const user = userEvent.setup();
    const { container } = render(<PrivacyFAQ />);
    
    const verificationQuestion = screen.getByText(/How can I verify no data is transmitted/i);
    await user.click(verificationQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/Right-click on this page/i)).toBeInTheDocument();
      // Check that the container includes the complete text
      expect(container.textContent).toContain('Network');
      expect(container.textContent).toContain('tab');
      expect(screen.getByText(/Upload your ChatGPT file/i)).toBeInTheDocument();
    });
  });

  it('references code files without direct links in verification methods', async () => {
    const user = userEvent.setup();
    const { container } = render(<PrivacyFAQ />);
    
    const verificationQuestion = screen.getByText(/How can I verify no data is transmitted/i);
    await user.click(verificationQuestion);
    
    await waitFor(() => {
      // Should mention the files without direct links
      expect(container.textContent).toContain('conversation-parser.ts');
      expect(container.textContent).toContain('water-calculator.ts');
      // Should reference where to find the link - use container to check for presence
      expect(container.textContent).toContain('Is this application open source?');
    });
  });

  it('has single primary GitHub link in open source section', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const openSourceQuestion = screen.getByText(/Is this application open source/i);
    await user.click(openSourceQuestion);
    
    await waitFor(() => {
      const githubLink = screen.getByRole('link', { name: /View Repository on GitHub/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/Quisharoo/chatgpt-water-impact');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('explains what data is not collected', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const dataQuestion = screen.getByText(/What information do you collect/i);
    await user.click(dataQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/We explicitly do NOT collect/i)).toBeInTheDocument();
      expect(screen.getByText(/Your uploaded files or their contents/i)).toBeInTheDocument();
      expect(screen.getByText(/Conversation data or metadata/i)).toBeInTheDocument();
    });
  });

  it('emphasizes verification over trust', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const trustQuestion = screen.getByText(/Why should I trust this tool/i);
    await user.click(trustQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/You shouldn't have to trust us/i)).toBeInTheDocument();
      expect(screen.getByText(/you can verify it yourself/i)).toBeInTheDocument();
    });
  });

  it('includes code file references', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const openSourceQuestion = screen.getByText(/Is this application open source/i);
    await user.click(openSourceQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/conversation-parser\.ts/i)).toBeInTheDocument();
      expect(screen.getByText(/water-calculator\.ts/i)).toBeInTheDocument();
    });
  });

  it('describes offline test capability', async () => {
    const user = userEvent.setup();
    render(<PrivacyFAQ />);
    
    const verificationQuestion = screen.getByText(/How can I verify no data is transmitted/i);
    await user.click(verificationQuestion);
    
    await waitFor(() => {
      expect(screen.getByText(/airplane mode/i)).toBeInTheDocument();
      expect(screen.getByText(/still works/i)).toBeInTheDocument();
    });
  });

  it('has proper ARIA structure for accordion', () => {
    render(<PrivacyFAQ />);
    
    // Check that accordion items are properly structured
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(6); // At least 6 FAQ questions
  });
});

