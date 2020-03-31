import React, { FunctionComponent, ReactNode } from 'react';

interface SpotlightPopupContentProps {
  description?: string;
  source?: string;
  close: () => void;
}

const SpotlightPopupContent: FunctionComponent<SpotlightPopupContentProps> = ({ close, description, source }) => {
  const renderSourceText = (): ReactNode => {
    if (source) {
      return (
        <>
          <b className="source-element">
            Source:
            <style jsx>{`
              .source-element {
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
      <style jsx>{`
        .spotlight-modal {
          font-size: 12px;
        }
        .spotlight-modal > .close {
          cursor: pointer;
          position: absolute;
          display: block;
          padding: 10px 10px;
          line-height: 20px;
          right: 0px;
          top: 0px;
          font-size: 26px;
          background: transparent;
          color: #333131;
          font-weight: 900;
        }
        .spotlight-modal > .content {
          width: 100%;
          padding: 35px 14px 5px 14px;
          font-size: 14px;
        }
        .content > .description {
          font-size: 14px;
        }
      `}</style>
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="content">
        <p className="description">{description}</p>
        <br />
        <p className="source">{renderSourceText()}</p>
      </div>
    </div>
  );
};
export { SpotlightPopupContent };
