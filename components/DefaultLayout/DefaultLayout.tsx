import React, { ReactNode, cloneElement, isValidElement, useEffect, useState } from 'react';
import { NextComponentType } from 'next';
import Header from '../Header/Header';
import { DefaultLayoutData } from './types';

const DefaultLayout: NextComponentType = ({ children }) => {
  const [ data, setData ] = useState<DefaultLayoutData | null>(null);

  useEffect(() => {
    console.log(data);
  }, [ data ]);

  const attachDataProp = (component: ReactNode) => {
    if (isValidElement(component)) {
      return cloneElement(component, { setData });
    }

    return component;
  };

  return (
    <div className="ui-base">
      <Header/>
      <main id="pagecontent" className="pagecontent -nofocus" role="main" tabIndex={ -1 }>
        { attachDataProp(children) }
      </main>
    </div>
  );
};

export { DefaultLayout as default, DefaultLayout };
