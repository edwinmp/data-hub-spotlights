import React, { FunctionComponent } from 'react';

const PageSection: FunctionComponent = ({ children }) => {
  return (
    <section className="section">
      <div className="row row--narrow">
        { children }
      </div>
    </section>
  );
};

export { PageSection };
