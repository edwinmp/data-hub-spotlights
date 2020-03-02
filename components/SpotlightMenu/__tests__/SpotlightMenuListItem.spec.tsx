/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenuListItem } from '../SpotlightMenuListItem';

describe('SpotlightMenuListItem', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenuListItem title={'Busia'} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuListItem title={'Palisa'}>
        <div>Testing</div>
      </SpotlightMenuListItem>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
