/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightHide } from '../SpotlightHide';

describe('SpotlightHide', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightHide />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightHide>
        <div>My Child</div>
      </SpotlightHide>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
