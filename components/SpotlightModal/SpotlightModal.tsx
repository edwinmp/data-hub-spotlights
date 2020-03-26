import React, { FunctionComponent } from 'react';
import Popup from 'reactjs-popup';
import { SpotlightModalContent } from './SpotlightModalContent';
import './styles.css';

interface SpotlightModalProps {
  description?: string;
  source?: string;
}

const SpotlightModal: FunctionComponent<SpotlightModalProps> = props => {
  const hideAllPopups = (): void => {
    const popups = document.querySelectorAll('.popup-content ');
    popups.forEach(function(popup) {
      popup.classList.add('hide');
    });
  };
  return (
    <Popup
      trigger={
        <span className="spotlight__stat-icon">
          <i onClick={hideAllPopups} role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
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
    >
      {close => <SpotlightModalContent close={close} description={props.description} source={props.source} />}
    </Popup>
  );
};
export { SpotlightModal };
