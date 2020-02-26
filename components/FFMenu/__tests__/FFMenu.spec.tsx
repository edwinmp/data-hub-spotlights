/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { FFMenu } from '../FFMenu';

describe('FFMenu', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<FFMenu />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <FFMenu>
        <div>Testing</div>
      </FFMenu>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
