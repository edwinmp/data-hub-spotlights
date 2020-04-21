/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  test('hides the view button when onShowAll is not provided', () => {
    const onShowAll = jest.fn();
    const { getByTestId, rerender } = render(<SpotlightMenuNav caption="Uganda" onShowAll={onShowAll} />);

    const viewButton = getByTestId('spotlight-nav-view');
    expect(viewButton).not.toHaveClass('hide');

    rerender(<SpotlightMenuNav caption="Uganda" />);

    expect(viewButton).toHaveClass('hide');
  });

  test('with an onShowAll function provided responds when the button is clicked', () => {
    const onShowAll = jest.fn();
    const { getByTestId } = render(<SpotlightMenuNav caption="Uganda" onShowAll={onShowAll} />);

    const viewButton = getByTestId('spotlight-nav-view');
    fireEvent.click(viewButton);

    expect(onShowAll).toBeCalledTimes(1);
  });
});
