import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface ComponentProps {
  show?: boolean;
  onClick?: () => void;
  caption: string;
}

const SpotlightMenuToggle: FunctionComponent<ComponentProps> = ({ show, caption, onClick }) => {
  return (
    <nav className={classNames('countries-menu-list js-countries-menu-trigger', { inactive: !show })}>
      <a className="countries-menu-list__item countries-menu-list__parent" onClick={onClick}>
        <span>{caption}</span>
        <style jsx>{`
          cursor: pointer;
          text-transform: capitalize;
        `}</style>
      </a>
    </nav>
  );
};

SpotlightMenuToggle.defaultProps = { show: false };

export { SpotlightMenuToggle };
