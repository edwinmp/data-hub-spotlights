import { FunctionComponent } from 'react';
import { Map, Layer } from 'mapbox-gl';

interface BaseMapLayerProps extends Layer {
  map?: Map;
  show?: boolean;
}

const BaseMapLayer: FunctionComponent<BaseMapLayerProps> = ({ map, show, ...options }) => {
  if (map) {
    if (map.getLayer(options.id)) {
      map.removeLayer(options.id);
    }
    if (show) {
      map.addLayer(options);
    }
  }

  return null;
};

BaseMapLayer.defaultProps = { show: true };

export { BaseMapLayer };
