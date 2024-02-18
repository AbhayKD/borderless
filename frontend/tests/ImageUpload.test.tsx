// MyComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PaperCardContainer from '../src/components/PaperCard';


describe('PaperCardContainer', () => {
  it('renders the passed message', () => {
    const testMessage = 'Select Passport';
    render(<PaperCardContainer  />);
    
    // Check if the message is in the document
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
