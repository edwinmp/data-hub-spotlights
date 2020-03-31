import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: FunctionComponent<IconProps> = ({ className, name }) => (
  <i role="presentation" aria-hidden="true" className={classNames(`ico ico-${name}`, className)}></i>
);

export { Icon };
