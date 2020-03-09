/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import SpotlightMenuNav from '../SpotlightMenuNav';

describe('SpotlightMenuNav', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenuNav caption="Uganda" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuNav caption="Uganda">
        <div>Testing</div>
      </SpotlightMenuNav>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
