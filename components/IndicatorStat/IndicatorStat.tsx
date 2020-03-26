import React, { FunctionComponent } from 'react';
import { ContentMeta } from '../../utils';
import { Icon } from '../Icon';

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
          <span className="spotlight__stat-icon">
            <Icon name="info-slate" className="ico--12" />
            <style jsx>{`
              .spotlight__stat-icon {
                display: none;
              }
            `}</style>
          </span>
        ) : null}
      </h3>
      {children}
    </div>
  );
};

IndicatorStat.defaultProps = { meta: {} };

export { IndicatorStat };
