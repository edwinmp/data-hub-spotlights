/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { PageSectionSubheading } from '../PageSectionSubHeading';

describe('PageSectionSubheading', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PageSectionSubheading>Child</PageSectionSubheading>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
