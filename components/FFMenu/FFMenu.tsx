import React, { FunctionComponent } from 'react';

interface FFMenuProps {
  title?: string;
}

const FFMenu: FunctionComponent<FFMenuProps> = props => {
  return (
    <div>
      <nav className="countries-menu-list js-countries-menu-trigger">
        <a className="countries-menu-list__item countries-menu-list__parent" href="#">
          <span>{props.title}</span>
        </a>
      </nav>
    </div>
  );
};

export { FFMenu };
