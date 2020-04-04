import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface ComponentProps {
  className?: string;
  width?: string;
  height?: string;
}

const SpotlightSidebar: FunctionComponent<ComponentProps> = ({ children, className, width, height }) => {
  return (
    <div className={classNames('spotlight__aside', className)}>
      {children}
      <style jsx>{`
        ${height ? `min-height: ${height};` : ''}
        ${width ? `width: ${width};` : ''}
      `}</style>
    </div>
  );
};

export { SpotlightSidebar };
