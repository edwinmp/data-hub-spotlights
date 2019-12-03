import React, { FunctionComponent } from 'react';
import { Navigation } from '../DefaultLayout';
import { PrimaryNavigation } from '../PrimaryNavigation';

interface HeaderProps {
  navigation?: Navigation;
}

const Header: FunctionComponent<HeaderProps> = ({ navigation }) => {
  console.log(navigation);

  return (
    <header role="banner" className="header">
      <div className="row">
        <a href="/" className="branding">Development Initiatives</a>
        <PrimaryNavigation/>
      </div>
    </header>
  );
};

export default Header;
