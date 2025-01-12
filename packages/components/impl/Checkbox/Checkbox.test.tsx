import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  test('renders with default label', () => {
    render(<Checkbox />);
    expect(screen.getByText(/Checkbox/i)).toBeInTheDocument();
  });

  test('renders with custom label', () => {
    render(<Checkbox label="I agree" />);
    expect(screen.getByText(/I agree/i)).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    fireEvent.click(screen.getByText(/Checkbox/i));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('shows checked styles when checked is true', () => {
    render(<Checkbox checked />);
    const checkboxElement = screen.getByText(/Checkbox/i);
    expect(checkboxElement).toHaveClass('cc-checkbox-checked');
  });
});
