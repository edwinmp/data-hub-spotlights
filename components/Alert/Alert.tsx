import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface AlertProps {
  variant: 'notice' | 'error' | 'success';
  className?: string;
  width?: string;
}

const Alert: FunctionComponent<AlertProps> = ({ className, children, variant, width = '50%' }) => (
  <div className={classNames(`alert alert--${variant}`, className)}>
    <style jsx>{`
      width: ${width};
    `}</style>
    {children}
  </div>
);

export { Alert };
