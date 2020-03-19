import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

const SpotlightBanner: FunctionComponent<{ className?: string }> = ({ children, className }) => (
  <div className={classNames('spotlight-banner', className)}>{children}</div>
);

export { SpotlightBanner };
