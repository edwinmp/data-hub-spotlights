import React, { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { SpotlightMapProps } from './utils';
import { BaseMap } from '../BaseMap';
import { config } from './utils';

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, level } = props;
  const { layers } = config[countryCode];
  const options = level && level <= layers.length ? layers[level] : layers[0];
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, [countryCode]);

  return (
    <Loading active={loading || !!props.dataLoading}>
      <BaseMap
        accessToken="pk.eyJ1IjoiZWR3aW5tcCIsImEiOiJjazFsdHVtcG0wOG9mM2RueWJscHhmcXZqIn0.cDR43UvfMaOY9cNJsEKsvg"
        options={{
          style: options.style,
          center: options.center,
          minZoom: options.minZoom || 6,
          zoom: options.zoom || 6.1,
          maxZoom: options.maxZoom || 7
        }}
        width="100%"
        height="100%"
      />
    </Loading>
  );
};

SpotlightMap.defaultProps = {
  level: 0,
  dataLoading: false
};

export { SpotlightMap };
