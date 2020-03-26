/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightModal } from '../SpotlightModal';

describe('SpotlightModal', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightModal />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified description and source', () => {
    const renderer = TestRenderer.create(
      <SpotlightModal description={'Poverty Headcount'} source={'Official World Bank Statistics'} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
