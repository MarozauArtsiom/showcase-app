import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput, { SearchItem } from './SearchInput';

describe('SearchInput component', () => {
  const items: SearchItem[] = [
    { id: '1', name: 'Alpha' },
    { id: '2', name: 'Beta' },
    { id: '3', name: 'Gamma' },
    { id: '4', name: 'Delta' },
  ];

  test('shows placeholder if query and selectedItem are empty', () => {
    render(
      <SearchInput
        query=""
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
        placeholder="Type to search..."
      />
    );
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
  });

  test('filters items by query', () => {
    const { rerender } = render(
      <SearchInput
        query="a"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    // Open the combobox
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(screen.queryByText('Delta')).not.toBeInTheDocument();

    // rerender with query="et"
    rerender(
      <SearchInput
        query="et"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.queryByText('Delta')).toBeInTheDocument();
  });

  test('calls onQueryChange when user types', () => {
    const handleChange = jest.fn();
    render(
      <SearchInput
        query=""
        onQueryChange={handleChange}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Be' } });
    expect(handleChange).toHaveBeenCalledWith('Be');
  });

  test('calls onSelect when an item is chosen', () => {
    const handleSelect = jest.fn();
    render(
      <SearchInput
        query="a"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );
    // open
    fireEvent.click(screen.getByRole('combobox'));
    // pick 'Gamma'
    fireEvent.click(screen.getByText('Gamma'));
    expect(handleSelect).toHaveBeenCalledWith({ id: '3', name: 'Gamma' });
  });

  test('displays the selectedItem name', () => {
    render(
      <SearchInput
        query=""
        onQueryChange={() => {}}
        items={items}
        selectedItem={{ id: '2', name: 'Beta' }}
        onSelect={() => {}}
      />
    );
    // The displayed input value should show "Beta"
    expect(screen.getByRole('combobox')).toHaveValue('Beta');
  });
});
