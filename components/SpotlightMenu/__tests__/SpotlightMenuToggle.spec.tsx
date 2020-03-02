/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenuToggle } from '../SpotlightMenuToggle';

describe('SpotlightMenuToggle', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenuToggle caption="Uganda" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuToggle caption="Uganda">
        <div>Testing</div>
      </SpotlightMenuToggle>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It adds inactive class when show prop is false', () => {
    const renderer = TestRenderer.create(<SpotlightMenuToggle caption="Uganda" show={false} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
