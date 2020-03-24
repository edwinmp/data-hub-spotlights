import React, { FunctionComponent } from 'react';

interface SpotlightHideProps {
  height?: string;
}

const SpotlightHide: FunctionComponent<SpotlightHideProps> = ({ children, height }) => {
  return (
    <div className="spotlight__hide-ss" style={{ height }}>
      {children}
      <style jsx>{`
        height: 100%;
      `}</style>
    </div>
  );
};

export { SpotlightHide };
