import React, { FunctionComponent } from 'react';

const SidebarHeading: FunctionComponent<{ heading?: string }> = ({ heading }) => {
  return (
    <h2 className="spotlight__heading">
      { heading }
      <button id="spotlight-menu-trigger" type="button" className="button button--minor">
        <i role="presentation" aria-hidden="true" className="ico ico--20 ico-arrow-down-blank"/>
      </button>
    </h2>
  );
};

export { SidebarHeading };
