import React, { SFC } from 'react';

const DefaultLayout: SFC = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  );
};

export { DefaultLayout as default, DefaultLayout };
