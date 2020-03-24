/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightSidebarInfo } from '../SpotlightSidebarInfo';

describe('SpotlightSidebarInfo', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightSidebarInfo heading="The Title" description="A short excerpt" />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
