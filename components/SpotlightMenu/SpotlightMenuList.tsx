import React, { FunctionComponent } from 'react';

interface SpotlightMenuListProps {
  active?: boolean;
  classNames?: string;
}

const SpotlightMenuList: FunctionComponent<SpotlightMenuListProps> = ({ active, children, classNames }) => {
  return (
    <ul className={classNames}>
      {children}
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
