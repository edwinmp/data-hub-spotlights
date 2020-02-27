import React, { FunctionComponent } from 'react';

const VisualisationSectionMain: FunctionComponent<{ width?: string }> = ({ children, width }) => (
  <div className="spotlight__main">
    {children}
    <style jsx>{`
      .spotlight__main :global(.leaflet-container) {
        background: inherit;
      }
      ${width ? 'width: ' + width : ''}
    `}</style>
  </div>
);

export { VisualisationSectionMain };
