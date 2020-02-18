import { FunctionComponent } from 'react';
import { Map, Layer } from 'mapbox-gl';

interface BaseMapLayerProps extends Layer {
  map?: Map;
}

const BaseMapLayer: FunctionComponent<BaseMapLayerProps> = ({ map, ...options }) => {
  if (map) {
    map.addLayer(options);
  }

  return null;
};

export { BaseMapLayer };
