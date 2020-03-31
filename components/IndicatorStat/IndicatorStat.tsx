import React, { FunctionComponent } from 'react';
import { ContentMeta } from '../../utils';
import { SpotlightPopup } from '../SpotlightPopup';

interface IndicatorStatProps {
  heading?: string;
  meta?: ContentMeta;
}
// TODO: add proper tooltip for description & source
const IndicatorStat: FunctionComponent<IndicatorStatProps> = ({ meta = {}, heading, children }) => {
  return (
    <div className="spotlight__stat">
      <h3 className="spotlight__stat-heading">
        {heading}
        {meta.description || meta.source ? (
          <SpotlightPopup description={meta.description} source={meta.source} />
        ) : null}
      </h3>
      {children}
    </div>
  );
};

IndicatorStat.defaultProps = { meta: {} };

export { IndicatorStat };
