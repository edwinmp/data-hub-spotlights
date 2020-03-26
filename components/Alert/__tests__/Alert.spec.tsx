/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Alert } from '../Alert';

describe('Alert', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<Alert variant="notice" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children', () => {
    const renderer = TestRenderer.create(
      <Alert variant="notice">
        <p>Warning</p>
      </Alert>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
