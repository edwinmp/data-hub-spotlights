import classNames from 'classnames';
import React, { FunctionComponent, useState, Children, isValidElement, cloneElement } from 'react';

interface SpotlightMenuProps {
  title: string;
}

const SpotlightMenu: FunctionComponent<SpotlightMenuProps> = ({ children, title }) => {
  const [active, setActive] = useState(false);
  const toggleMenu = (): void => {
    setActive(!active);
  };

  return (
    <div>
      <nav className={classNames('countries-menu-list js-countries-menu-trigger', { inactive: active })}>
        <a className="countries-menu-list__item countries-menu-list__parent" onClick={toggleMenu}>
          <span>{title}</span>
          <style jsx>{`
            cursor: pointer;
          `}</style>
        </a>
      </nav>
      <nav className={classNames('countries-menu-list animated', { inactive: !active })}>
        <style jsx>{`
          cursor: pointer;
        `}</style>
        <a
          className="countries-menu-list__item countries-menu-list__parent countries-menu-list__item--open js-countries-menu-trigger"
          href="#"
          onClick={toggleMenu}
        >
          {title}
        </a>
        <a
          className="countries-menu__profile countries-menu__link js-profile-item"
          aria-hidden="true"
          title={`View ${title}`}
        >
          View
        </a>
        {Children.map(children, child => isValidElement(child) && cloneElement(child, { active }))}
      </nav>
    </div>
  );
};

export { SpotlightMenu };
