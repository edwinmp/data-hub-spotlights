import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, ContentNote, ValueOptions } from '../../utils';
import { getIndicatorValue, getIndicatorsValue } from './utils';
import { IndicatorStatDataViewer } from './IndicatorStatDataViewer';

interface DataHandlerProps {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
  valueOptions?: ValueOptions;
  note?: ContentNote;
  decimalCount?: number;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({
  data,
  dataLoading,
  decimalCount,
  ...props
}) => {
  if (!dataLoading && data) {
    if (data.length === 1) {
      return (
        <IndicatorStatDataViewer
          value={getIndicatorValue(
            data[0].data,
            props.valueOptions,
            props.valueOptions?.suffix?.indexOf('th') === 0 ? 0 : decimalCount
          )}
          note={props.note}
        />
      );
    }

    return (
      <IndicatorStatDataViewer
        value={getIndicatorsValue(
          data,
          props.valueOptions,
          props.valueOptions?.suffix?.indexOf('th') === 0 ? 0 : decimalCount
        )}
        note={props.note}
      />
    );
  }

  return <div>Loading ...</div>;
};

IndicatorStatDataHandler.defaultProps = { valueOptions: { dataFormat: 'plain' }, decimalCount: 1 };

export { IndicatorStatDataHandler };
