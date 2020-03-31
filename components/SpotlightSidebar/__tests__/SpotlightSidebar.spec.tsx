/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightSidebar } from '../SpotlightSidebar';

describe('SpotlightSidebar', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightSidebar />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified class name', () => {
    const renderer = TestRenderer.create(<SpotlightSidebar className="spotlight__aside--no-margin" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified width', () => {
    const renderer = TestRenderer.create(<SpotlightSidebar width="300px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children', () => {
    const renderer = TestRenderer.create(
      <SpotlightSidebar>
        <div>My Child</div>
      </SpotlightSidebar>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
