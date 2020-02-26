import React, { FunctionComponent } from 'react';

interface FFMenuListProps {
  active?: boolean;
  classNames?: string;
}

const FFMenuList: FunctionComponent<FFMenuListProps> = ({ active, children, classNames }) => {
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

export { FFMenuList };
