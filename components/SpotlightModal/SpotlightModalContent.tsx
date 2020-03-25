import React, { FunctionComponent } from 'react';

interface SpotlightModalContentProps {
  description?: string;
  source?: string;
  close: () => void;
}

const SpotlightModalContent: FunctionComponent<SpotlightModalContentProps> = ({ close, description, source }) => {
  const renderSourceText = () => {
    if (source) {
      return (
        <>
          <b className="sourceElement">
            Source:
            <style jsx>{`
              .sourceElement {
                font-weight: 900;
              }
            `}</style>
          </b>
          {source}
        </>
      );
    }
  };

  return (
    <div className="spotlight-modal">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="content">
        {' '}
        <p className="description">{description}</p>
        <br />
        <p className="source">{renderSourceText()}</p>
      </div>
    </div>
  );
};
export { SpotlightModalContent };
