/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HowToAddLocation from '../components/HowToAddLocation/HowToAddLocation';

describe('How To Add Location Tests', () => {
  test('Text test', () => {
    render(<HowToAddLocation />);
    const howTo = screen.getByText(/navBar.howToUse/i);
    expect(howTo).toBeInTheDocument();
  });
  test('Button test', () => {
    render(<HowToAddLocation />);
    const btn = screen.getByTestId('button-open');
    expect(btn).toBeInTheDocument();
  });
  test('Click to check title test', () => {
    render(<HowToAddLocation />);
    const btn = screen.getByTestId('button-open');
    expect(screen.queryByTestId('dialog-title')).toBeNull();
    fireEvent.click(btn);
    expect(screen.queryByTestId('dialog-title')).toBeInTheDocument();
  });
});
