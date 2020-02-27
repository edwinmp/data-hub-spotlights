import React, { FunctionComponent, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Mmenu from 'mmenu-js';
import 'mmenu-js/dist/mmenu.css';

interface SpotlightMmenuProps {
  active?: boolean;
  items: SpotlightMmenuItem[];
}

export interface SpotlightMmenuItem {
  title: string;
  url?: string;
  children?: SpotlightMmenuItem[];
  onClick?: () => void;
}

const SpotlightMmenu: FunctionComponent<SpotlightMmenuProps> = ({ active, items }) => {
  const menuNode = useRef(null);

  useEffect(() => {
    if (menuNode && menuNode.current) {
      new Mmenu(menuNode.current, { offCanvas: false }, { classNames: { selected: 'active' } }); // tslint:disable-line
    }
  }, []);

  const renderItem = (item: SpotlightMmenuItem) =>
    item.url ? (
      <a href={item.url} onClick={item.onClick}>
        {item.title}
      </a>
    ) : (
      <span onClick={item.onClick}>{item.title}</span>
    );

  const renderListItem = (item: SpotlightMmenuItem, index: number) => (
    <li key={index}>
      {renderItem(item)}
      {item.children ? <ul>{item.children.map(renderListItem)}</ul> : null}
    </li>
  );

  const renderNavList = () => <ul>{items.map(renderListItem)}</ul>;

  return (
    <nav
      id="menu"
      className={classNames('spotlight-menu mm-menu', { 'spotlight-menu--active': active })}
      ref={menuNode}
    >
      {renderNavList()}
    </nav>
  );
};

export { SpotlightMmenu };
