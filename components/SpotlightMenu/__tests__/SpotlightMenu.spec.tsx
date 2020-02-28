/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenu } from '../SpotlightMenu';

describe('SpotlightMenu', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenu title={'Uganda'} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenu title={'Uganda'}>
        <div>Testing</div>
      </SpotlightMenu>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
