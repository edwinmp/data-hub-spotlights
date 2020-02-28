import classNames from 'classnames';
import React, { FunctionComponent, useState, Children, isValidElement, cloneElement } from 'react';

interface SpotlightMenuProps {
  title: string;
}

const SpotlightMenu: FunctionComponent<SpotlightMenuProps> = ({ children, title }) => {
  const [active, setActive] = useState(false);
  const [menuTitle, setMenuTitle] = useState(title);
  const toggleMenu = (): void => {
    setActive(!active);
  };

  const onViewClicked = (_event: any, title: string) => {
    event?.stopPropagation();
    setMenuTitle(title);
  };
  const resetTitle = () => setMenuTitle(title);

  return (
    <div>
      <nav className={classNames('countries-menu-list js-countries-menu-trigger', { inactive: active })}>
        <a className="countries-menu-list__item countries-menu-list__parent" onClick={toggleMenu}>
          <span>{menuTitle}</span>
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
          {menuTitle}
        </a>
        <a
          className="countries-menu__profile countries-menu__link js-profile-item"
          aria-hidden="true"
          title={`View ${menuTitle}`}
          onClick={resetTitle}
        >
          View
        </a>
        {Children.map(
          children,
          child => isValidElement(child) && cloneElement(child, { active, onViewClick: onViewClicked })
        )}
      </nav>
    </div>
  );
};

export { SpotlightMenu };
