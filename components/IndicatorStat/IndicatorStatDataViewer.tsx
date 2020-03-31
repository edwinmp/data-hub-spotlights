import React, { FunctionComponent, ReactText } from 'react';
import { ContentNote } from '../../utils';
import { Icon } from '../Icon';

interface IndicatorStatDataProps {
  note?: ContentNote;
  value?: ReactText;
}

// TODO: implement proper tooltip handling
const IndicatorStatDataViewer: FunctionComponent<IndicatorStatDataProps> = ({ value, note }) => {
  return (
    <p className="spotlight__stat-data">
      {value}
      {note && note.content ? (
        <span className="spotlight__stat-data__note">
          {note.content}{' '}
          {note.meta ? (
            <span className="spotlight__stat-icon">
              <Icon name="info-slate" className="ico--12" />
            </span>
          ) : null}
        </span>
      ) : null}
    </p>
  );
};

export { IndicatorStatDataViewer };
