import { FunctionComponent } from 'react';
import { Map, Layer } from 'mapbox-gl';

interface BaseMapLayerProps extends Layer {
  map?: Map;
  show?: boolean;
  onAdd?: (map: Map, layerID: string) => void;
}

const BaseMapLayer: FunctionComponent<BaseMapLayerProps> = ({ map, show, onAdd, ...options }) => {
  if (map) {
    if (map.getLayer(options.id)) {
      map.removeLayer(options.id);
    }
    if (show) {
      map.addLayer(options);
      if (onAdd) {
        onAdd(map, options.id);
      }
    }
  }

  return null;
};

BaseMapLayer.defaultProps = { show: true };

export { BaseMapLayer };
