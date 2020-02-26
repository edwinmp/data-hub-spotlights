import classNames from 'classnames';
import React, { Children, FunctionComponent, useState, cloneElement, isValidElement } from 'react';

interface FFMenuListItemProps {
  title?: string;
}

const FFMenuListItem: FunctionComponent<FFMenuListItemProps> = ({ title, children }) => {
  const [active, setActive] = useState(false);
  const toggleActive = (_event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    // TODO: use event object or remove
    setActive(!active);
  };

  return (
    <li className={classNames({ 'countries-menu-list--has-children': children })}>
      <a
        className={classNames(
          'countries-menu-list__item countries-menu-list__item--parent-first js-menu-item js-search-item',
          { active }
        )}
        onClick={toggleActive}
      >
        {title}
      </a>
      <a className="countries-menu__profile countries-menu__link js-profile-item">View</a>
      {Children.map(children, child => isValidElement(child) && cloneElement(child, { active }))}
    </li>
  );
};

export { FFMenuListItem };
