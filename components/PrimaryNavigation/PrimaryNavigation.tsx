import React, { FunctionComponent } from 'react';

const PrimaryNavigation: FunctionComponent = () => {
  return (
    <>
      <button role="button" className="navigation-primary-toggle" id="navigation-primary-toggle">
        <span>Menu</span>
      </button>
      <nav className="navigation-primary" role="navigation" id="navigation-primary">
        <ul className="navigation-primary__items">
          <li>List Goes Here</li>
        </ul>
      </nav>
    </>
  );
};

export { PrimaryNavigation };
