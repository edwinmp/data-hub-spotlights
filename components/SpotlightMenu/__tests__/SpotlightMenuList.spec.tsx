/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenuList } from '../SpotlightMenuList';

describe('SpotlightMenuList', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuList classNames="countries-menu-list__content" active={true} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It is not rendered when active prop is false', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuList active={false} classNames="countries-menu-list__content" />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuList classNames="countries-menu-list__content" active={true}>
        <div>Testing</div>
      </SpotlightMenuList>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
