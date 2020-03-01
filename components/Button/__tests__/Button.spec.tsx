/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Footer', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<Button>Caption</Button>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
