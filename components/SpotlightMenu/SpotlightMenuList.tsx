import React, { Children, cloneElement, isValidElement, FunctionComponent } from 'react';

interface SpotlightMenuListProps {
  active?: boolean;
  classNames?: string;
  onViewClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, title?: string) => void;
}

const SpotlightMenuList: FunctionComponent<SpotlightMenuListProps> = ({
  active,
  children,
  classNames,
  onViewClick
}) => {
  return (
    <ul className={classNames}>
      {Children.map(children, child => isValidElement(child) && cloneElement(child, { onView: onViewClick }))}
      <style jsx>{`
        display: ${active ? 'block !important' : 'none'};
        .countries-menu-list__content {
          max-height: 40vh;
        }
      `}</style>
    </ul>
  );
};

export { SpotlightMenuList };
