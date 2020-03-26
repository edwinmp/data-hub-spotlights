import React, { FunctionComponent } from 'react';

interface AlertProps {
  variant: 'notice' | 'error' | 'success';
}

const Alert: FunctionComponent<AlertProps> = ({ children, variant }) => (
  <div className={`alert alert--${variant}`}>{children}</div>
);

export { Alert };
