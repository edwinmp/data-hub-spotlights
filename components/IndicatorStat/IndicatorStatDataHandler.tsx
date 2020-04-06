import React, { FunctionComponent, useEffect, useState } from 'react';
import { ContentNote, ValueOptions } from '../../utils';
import { Alert } from '../Alert';
import { DataLoaderProps, useDDWData } from '../DDWDataLoader';
import { IndicatorStatDataViewer } from './IndicatorStatDataViewer';
import { getIndicatorsValue, getIndicatorValue } from './utils';

interface DataHandlerProps {
  dataOptions: DataLoaderProps;
  valueOptions?: ValueOptions;
  note?: ContentNote;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({ dataOptions, ...props }) => {
  const [retryCount, setRetryCount] = useState(0);
  const { data, dataLoading, refetch, error } = useDDWData(dataOptions);
  useEffect(() => {
    if (error) {
      const { message } = error;
      if (message.includes('relation') && message.includes('does not exist') && retryCount === 0 && refetch) {
        refetch();
        setRetryCount(retryCount + 1);
      }
    } else {
      setRetryCount(0);
    }
  }, [error]);

  if (dataLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    // TODO: add manual reload button
    return <Alert variant="error">Something went wrong while loading this widget</Alert>;
  }

  if (data) {
    if (data.length === 1) {
      return <IndicatorStatDataViewer value={getIndicatorValue(data[0].data, props.valueOptions)} note={props.note} />;
    }

    return <IndicatorStatDataViewer value={getIndicatorsValue(data, props.valueOptions)} note={props.note} />;
  }

  return <IndicatorStatDataViewer value="No Data" />;
};

IndicatorStatDataHandler.defaultProps = { valueOptions: { dataFormat: 'plain' } };

export { IndicatorStatDataHandler };
