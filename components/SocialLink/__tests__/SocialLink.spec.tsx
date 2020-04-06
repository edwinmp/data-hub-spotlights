/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SocialLink } from '../SocialLink';

describe('SocialLink', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SocialLink socialSource="twitter" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
