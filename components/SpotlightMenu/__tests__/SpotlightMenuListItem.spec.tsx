/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenuListItem } from '../SpotlightMenuListItem';

describe('SpotlightMenuListItem', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenuListItem item={{ label: 'Busia', value: 'busia' }} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuListItem item={{ label: 'Palisa', value: 'palisa' }}>
        <div>Testing</div>
      </SpotlightMenuListItem>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
