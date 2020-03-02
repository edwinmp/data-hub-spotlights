import classNames from 'classnames';
import React, { Children, FunctionComponent, useState, cloneElement, isValidElement } from 'react';

interface ComponentProps {
  item: MenuListItem;
  depth?: number;
  viewable?: boolean;
  onView?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: MenuListItem) => void;
}

export interface MenuListItem {
  label: string;
  value: string;
}

const SpotlightMenuListItem: FunctionComponent<ComponentProps> = ({ item, children, depth, ...props }) => {
  const [active, setActive] = useState(false);
  const toggleActive = (): void => {
    setActive(!active);
  };
  const onView = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.stopPropagation();
    if (props.onView) {
      props.onView(event, item);
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
        {item.label}
        <style jsx>{`
          :before {
            display: ${children ? 'inline-block' : 'none'};
          }
        `}</style>
      </a>
      <a
        className="countries-menu__profile countries-menu__link js-profile-item"
        onClick={onView}
        title={`View ${item.label}`}
      >
        View
        <style jsx>{`
          ${!props.viewable ? 'display: none;' : ''}
        `}</style>
      </a>
      {Children.map(children, child => isValidElement(child) && cloneElement(child, { active }))}
    </li>
  );
};

SpotlightMenuListItem.defaultProps = { depth: 1, viewable: true };

export { SpotlightMenuListItem };
