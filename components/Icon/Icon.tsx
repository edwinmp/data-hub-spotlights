import React, { FunctionComponent } from 'react';

interface IconProps {
  name: string;
}

const Icon: FunctionComponent<IconProps> = ({ name }) => (
  <i role="presentation" aria-hidden="true" className={`ico ico-${name}`}></i>
);

export { Icon };
