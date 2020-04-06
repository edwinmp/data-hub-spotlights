import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface NavigationItemProps {
  title: string;
  active: boolean;
  url: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ active, title, url }) => {
  return (
    <li className={classNames('navigation-secondary__item', { 'navigation-secondary__item--active': active })}>
      <a href={url}>{title}</a>
    </li>
  );
};

export { NavigationItem };
