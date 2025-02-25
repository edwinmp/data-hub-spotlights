/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LegendItem } from '../LegendItem';

describe('LegendItem', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<LegendItem />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified class', () => {
    const { container } = render(<LegendItem className="legend-item" />);

    expect(container.firstChild).toHaveClass('legend-item');
  });

  test('renders with the specified children', () => {
    const { container } = render(
      <LegendItem>
        <span>30%</span>
      </LegendItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
