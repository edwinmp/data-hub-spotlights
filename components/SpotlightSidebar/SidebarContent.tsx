import React, { FunctionComponent } from 'react';

const SidebarContent: FunctionComponent = ({ children }) => {
  return (
    <div className="spotlight__content">
      { children }
    </div>
  );
};

export { SidebarContent };
