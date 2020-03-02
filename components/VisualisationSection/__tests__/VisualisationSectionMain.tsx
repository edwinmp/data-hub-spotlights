/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { VisualisationSectionMain } from '../VisualisationSectionMain';

describe('VisualisationSectionMain', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<VisualisationSectionMain />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the configured width', () => {
    const renderer = TestRenderer.create(<VisualisationSectionMain width="100px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
