import React, { FunctionComponent, useState, ReactNode } from 'react';
import { SpotlightMenu, SpotlightMenuToggle, SpotlightMenuList, SpotlightMenuListItem } from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';
import { SpotlightBoundary } from '../../utils';

interface BoundaryMenuProps {
  boundaries: SpotlightBoundary[];
  countryName: string;
}

const BoundaryMenu: FunctionComponent<BoundaryMenuProps> = ({ boundaries, countryName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(countryName);

  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem(countryName);
  };
  const onView = (_event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, locationName: string): void => {
    setActiveItem(locationName);
    setShowMenu(false);
  };

  const renderMenuItems = (data: SpotlightBoundary[], depth = 1, setActive: (_id: string) => void): ReactNode =>
    data.map((location, index: number) => (
      <SpotlightMenuListItem key={index} title={location.name} depth={depth} onView={onView}>
        {location.children ? (
          <SpotlightMenuList>{renderMenuItems(location.children, depth + 1, setActive)}</SpotlightMenuList>
        ) : null}
      </SpotlightMenuListItem>
    ));

  return (
    <SpotlightMenu>
      <SpotlightMenuToggle caption={activeItem} show={!showMenu} onClick={onShowMenu} />
      <SpotlightMenuNav caption={'Uganda'} active={showMenu} onClick={onShowMenu} onShowAll={onShowAll}>
        <SpotlightMenuList classNames="countries-menu-list__content">
          {renderMenuItems(boundaries, 1, (item: string) => setActiveItem(item))}
        </SpotlightMenuList>
      </SpotlightMenuNav>
    </SpotlightMenu>
  );
};

export { BoundaryMenu };
