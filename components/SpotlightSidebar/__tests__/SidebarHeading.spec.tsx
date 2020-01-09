/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SidebarHeading } from '../SidebarHeading';

describe('SidebarHeading', () => {
  test('renders correctly with a heading', () => {
    const renderer = TestRenderer.create(
      <SidebarHeading heading="My Heading"/>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
