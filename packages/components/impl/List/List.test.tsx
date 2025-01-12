import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List, Option } from './List';

const List = List; // Named export for clarity

describe('List component with actions (stateless)', () => {
  const sampleOptions: Option[] = [
    { id: 1, name: 'Option One' },
    {
      id: 2,
      name: 'Option Two',
      actions: [
        {
          icon: <span data-testid="action-icon">ICON</span>,
          onClick: jest.fn(),
        },
      ],
    },
    { id: 3, name: 'Option Three' },
  ];

  test('renders placeholder when value is null', () => {
    render(
      <List
        options={sampleOptions}
        value={null}
        onChange={() => {}}
        placeholder="No selection"
      />
    );
    expect(screen.getByText(/No selection/i)).toBeInTheDocument();
  });

  test('displays the provided value name when value is set', () => {
    render(
      <List
        options={sampleOptions}
        value={sampleOptions[0]}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Option One')).toBeInTheDocument();
  });

  test('opens dropdown on button click and displays options', () => {
    render(
      <List
        options={sampleOptions}
        value={sampleOptions[0]}
        onChange={() => {}}
      />
    );
    fireEvent.click(screen.getByText('Option One')); // open list
    expect(screen.getByText('Option Two')).toBeInTheDocument();
    expect(screen.getByText('Option Three')).toBeInTheDocument();
  });

  test('calls onChange when a new option is selected', () => {
    const handleChange = jest.fn();
    render(
      <List
        options={sampleOptions}
        value={sampleOptions[0]}
        onChange={handleChange}
      />
    );
    // Open the list
    fireEvent.click(screen.getByText('Option One'));
    // Select Option Three
    fireEvent.click(screen.getByText('Option Three'));
    expect(handleChange).toHaveBeenCalledWith(sampleOptions[2]);
  });

  test('renders action icon and triggers action on click', () => {
    render(
      <List
        options={sampleOptions}
        value={sampleOptions[0]}
        onChange={() => {}}
      />
    );
    // Open the list
    fireEvent.click(screen.getByText('Option One'));

    // For "Option Two", we have an action icon
    const icon = screen.getByTestId('action-icon');
    expect(icon).toBeInTheDocument();

    // Click the icon => should NOT close list or change selection
    fireEvent.click(icon);
    // Find the associated action
    const action = sampleOptions[1].actions?.[0].onClick;
    expect(action).toHaveBeenCalledWith(sampleOptions[1]);
  });
});
