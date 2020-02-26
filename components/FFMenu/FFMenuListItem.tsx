import classNames from 'classnames';
import React, { Children, FunctionComponent, useState, cloneElement, isValidElement } from 'react';

interface FFMenuListItemProps {
  title?: string;
  onView?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, title?: string) => void;
}

const FFMenuListItem: FunctionComponent<FFMenuListItemProps> = ({ title, children, onView: onViewProp }) => {
  const [active, setActive] = useState(false);
  const toggleActive = (): void => {
    setActive(!active);
  };
  const onView = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.stopPropagation();
    if (onViewProp) {
      onViewProp(event, title);
    }
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
      <a className="countries-menu__profile countries-menu__link js-profile-item" onClick={onView}>
        View
      </a>
      {Children.map(children, child => isValidElement(child) && cloneElement(child, { active }))}
    </li>
  );
};

export { FFMenuListItem };
