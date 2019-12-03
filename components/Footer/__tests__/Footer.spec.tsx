/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Footer } from '../Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <Footer/>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
