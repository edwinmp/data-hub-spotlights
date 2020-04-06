import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface AlertProps {
  variant: 'notice' | 'error' | 'success';
  className?: string;
}

const Alert: FunctionComponent<AlertProps> = ({ className, children, variant }) => (
  <div className={classNames(`alert alert--${variant}`, className)}>{children}</div>
);

export { Alert };
