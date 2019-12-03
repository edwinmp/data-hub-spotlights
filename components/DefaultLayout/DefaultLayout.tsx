import { NextComponentType } from 'next';
import React, { ReactNode, cloneElement, isValidElement, useState } from 'react';
import Header from '../Header/Header';
import { DefaultLayoutData } from './types';

const DefaultLayout: NextComponentType = ({ children }) => {
  const [ data, setData ] = useState<DefaultLayoutData | undefined>();

  const attachDataProp = (component: ReactNode) => {
    if (isValidElement(component)) {
      return cloneElement(component, { setData });
    }

    return component;
  };

  return (
    <div className="ui-base">
      <Header navigation={ data && data.navigation }/>
      <main id="pagecontent" className="pagecontent -nofocus" role="main" tabIndex={ -1 }>
        { attachDataProp(children) }
      </main>
    </div>
  );
};

export { DefaultLayout as default, DefaultLayout };
