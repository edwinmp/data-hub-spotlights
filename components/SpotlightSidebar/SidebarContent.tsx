import React, { FunctionComponent } from 'react';

interface SidebarContentProps {
  height?: string;
}

const SidebarContent: FunctionComponent<SidebarContentProps> = ({ children, height }) => {
  return (
    <div className="spotlight__content" style={ { height } }>
      { children }
    </div>
  );
};

export { SidebarContent };
