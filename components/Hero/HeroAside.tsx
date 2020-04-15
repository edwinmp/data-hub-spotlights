import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface HeroAsideProps {
  className?: string;
}

const HeroAside: FunctionComponent<HeroAsideProps> = ({ children, className }) => {
  return <div className={classNames('hero__aside', className)}>{children}</div>;
};

export { HeroAside };
