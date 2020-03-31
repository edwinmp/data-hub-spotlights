/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightPopup } from '../SpotlightPopup';

describe('SpotlightPopup', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightPopup />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified description and source', () => {
    const renderer = TestRenderer.create(
      <SpotlightPopup description={'Poverty Headcount'} source={'Official World Bank Statistics'} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
