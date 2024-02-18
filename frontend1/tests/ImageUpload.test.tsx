
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import PaperCardContainer from '../src/components/PaperCard';

// Extend the jest module to add TypeScript definitions for mocking
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImageUpload Component', () => {
  test('displays error message when upload fails', async () => {
    const errorMessage = 'Image is too blurry.';
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    render(<PaperCardContainer />);
    const fileInput = screen.getByRole('textbox');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for the error message to appear
    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
