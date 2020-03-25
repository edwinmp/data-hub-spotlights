import React, { FunctionComponent, useState } from 'react';
import Popup from 'reactjs-popup';
import { SpotlightModalContent } from './SpotlightModalContent';
import './styles.css';

interface SpotlightModalProps {
  description?: string;
  source?: string;
}

const SpotlightModal: FunctionComponent<SpotlightModalProps> = props => {
  const [open, toggleOpen] = useState(false);
  const onMouseLeaveModal = (): void => {
    console.log('Onclick');
    toggleOpen(false);
  };

  return (
    <Popup
      trigger={
        <span className="spotlight__stat-icon" onClick={onMouseLeaveModal}>
          <i role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
          <style jsx>{`
            .spotlight__stat-icon {
              display: inline-block;
              margin-left: 10px;
              cursor: pointer;
            }
          `}</style>
        </span>
      }
      position="top center"
      closeOnDocumentClick
      open={open}
    >
      {close => <SpotlightModalContent close={close} description={props.description} source={props.source} />}
    </Popup>
  );
};
export { SpotlightModal };
