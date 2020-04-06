/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { HeroAside } from '../HeroAside';

describe('HeroAside', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<HeroAside />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with specified className', () => {
    const renderer = TestRenderer.create(<HeroAside className="spotlight-hero-aside" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with specified children', () => {
    const renderer = TestRenderer.create(
      <HeroAside>
        <div>My Child</div>
      </HeroAside>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
