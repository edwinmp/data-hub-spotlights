import React, {
  FunctionComponent,
  useEffect,
  useRef,
  Children,
  ReactNode,
  isValidElement,
  cloneElement,
  useState
} from 'react';
import mapbox, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BaseMapLayer } from './BaseMapLayer';

export interface CoreMapProps {
  accessToken: string;
  width?: string;
  height?: string;
  background?: string;
  showNavigationControls?: boolean;
  onLoad?: (map: mapbox.Map, event: mapbox.MapboxEvent) => void;
}
interface BaseMapProps extends CoreMapProps {
  options: Partial<mapbox.MapboxOptions>;
}

const BaseMap: FunctionComponent<BaseMapProps> = props => {
  mapbox.accessToken = props.accessToken;
  const mapNode = useRef<HTMLDivElement>(null);
  const [baseMap, setBaseMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    if (mapNode && mapNode.current) {
      const map = new mapbox.Map({
        container: mapNode.current,
        ...props.options
      });

      if (props.showNavigationControls) {
        map.addControl(new mapbox.NavigationControl());
      }

      map.on('load', event => {
        setBaseMap(map);
        if (props.onLoad) {
          props.onLoad(map, event);
        }
      });
    }
  }, []);

  const renderLayers = (): ReactNode => {
    return Children.map(props.children, child => {
      if (isValidElement(child) && child.type === BaseMapLayer) {
        return cloneElement(child, { map: baseMap });
      }
    });
  };

  return (
    <div ref={mapNode} style={{ width: props.width, height: props.height }}>
      {renderLayers()}
      <style jsx>{`
        background: ${props.background};
      `}</style>
    </div>
  );
};

BaseMap.defaultProps = {
  width: '940px', // spotlights default
  height: '596px', // spotlights default
  background: '#D3E0F4', // spotlights default
  options: {
    minZoom: 6,
    zoom: 6.1
  },
  showNavigationControls: true
};

export { BaseMap };
