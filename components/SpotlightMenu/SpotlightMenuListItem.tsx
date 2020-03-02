import classNames from 'classnames';
import React, { Children, FunctionComponent, useState, cloneElement, isValidElement } from 'react';

interface ComponentProps {
  title?: string;
  depth?: number;
  onView?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, title?: string) => void;
}

const SpotlightMenuListItem: FunctionComponent<ComponentProps> = ({ title, children, onView: onViewProp, depth }) => {
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
    <li
      className={classNames({
        'countries-menu-list--has-children': children,
        'countries-menu-list__countries': !children,
        'js-profile-country-item': !children
      })}
    >
      <a
        className={classNames('countries-menu-list__item js-menu-item js-search-item', {
          active,
          'countries-menu-list__item--open': active && children,
          'countries-menu-list__item--parent-first': depth === 1,
          'countries-menu-list__item--parent-second': depth === 2,
          'countries-menu-list__item--parent-third': depth === 3,
          'countries-menu-list__item--parent-fourth': depth === 4,
          'countries-menu-list__item--parent-fifth': depth === 5,
          'countries-menu-list__item--parent-sixth': depth === 6
        })}
        onClick={toggleActive}
      >
        {title}
        <style jsx>{`
          :before {
            display: ${children ? 'inline-block' : 'none'};
          }
        `}</style>
      </a>
      <a
        className="countries-menu__profile countries-menu__link js-profile-item"
        onClick={onView}
        title={`View ${title}`}
      >
        View
      </a>
      {Children.map(children, child => isValidElement(child) && cloneElement(child, { active }))}
    </li>
  );
};

SpotlightMenuListItem.defaultProps = { depth: 1 };

export { SpotlightMenuListItem };
