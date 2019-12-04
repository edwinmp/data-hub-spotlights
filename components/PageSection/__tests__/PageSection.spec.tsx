/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { PageSection } from '../PageSection';

describe('PageSection', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PageSection/>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
