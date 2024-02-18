// MyComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PaperCardContainer from '../components/PaperCard';
import { store } from '../store/store';
import { Provider } from 'react-redux';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  // Add other methods as needed
}));

describe('PaperCardContainer', () => {
  it('renders the passed message', () => {
    const testMessage = 'Select Passport';
    const { getByText } = render(
      <Provider store={store}>
          <PaperCardContainer />
      </Provider>
  );
    
    // Check if the message is in the document
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
