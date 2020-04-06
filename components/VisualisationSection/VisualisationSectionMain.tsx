import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface ComponentProps {
  className?: string;
  width?: string;
}

const VisualisationSectionMain: FunctionComponent<ComponentProps> = ({ children, width, className }) => (
  <div className={classNames('spotlight__main', className)}>
    {children}
    <style jsx>{`
      .spotlight__main {
        background: inherit;
      }
      ${width ? `width: ${width};` : ''}
    `}</style>
  </div>
);

export { VisualisationSectionMain };
