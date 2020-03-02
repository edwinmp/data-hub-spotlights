/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { IndicatorComparisonColumnChart } from '../IndicatorComparisonColumnChart';

describe('IndicatorComparisonColumnChart', () => {
  test('renders default state correctly', () => {
    const renderer = TestRenderer.create(<IndicatorComparisonColumnChart />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
