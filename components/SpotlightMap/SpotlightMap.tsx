import { LngLat, Map, MapboxGeoJSONFeature, Popup } from 'mapbox-gl';
import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { BaseMap, BaseMapLayer } from '../BaseMap';
import { Loading } from '../Loading';
import { config, getLocationStyles, renderTooltip, SpotlightMapProps, TooltipEvent, LayerConfig } from './utils';

const COLOURED_LAYER = 'highlight';

const getPosition = ({ geometry }: MapboxGeoJSONFeature): LngLat | null => {
  if (geometry) {
    if (geometry.type === 'Polygon') {
      const position = geometry.coordinates[0][0];

      return new LngLat(position[0], position[1]);
    }
    if (geometry.type === 'MultiPolygon') {
      const positions = geometry.coordinates[0][0];

      return new LngLat(positions[0][0], positions[0][1]);
    }
  }

  return null;
};

const flyToLocation = (map: Map, locationName: string, options: LayerConfig): void => {
  const features = map.querySourceFeatures('composite', {
    sourceLayer: options.sourceLayer,
    filter: ['in', options.nameProperty, locationName]
  });

  if (features && features.length) {
    const position = getPosition(features[0]);
    if (position) {
      map.flyTo({
        center: position,
        zoom: 16
      });
    }
  }
};

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, level, data, dataLoading, range, colours } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const { layers } = config[countryCode];
  const options = { ...(level && level <= layers.length ? layers[level] : layers[0]), ...props.layerConfig };

  useEffect(() => {
    if (map) {
      const popup = new Popup({
        offset: 5,
        closeButton: false
      });
      const onHover = (event: TooltipEvent): void => {
        map.getCanvas().style.cursor = 'pointer';
        renderTooltip(map, event, {
          nameProperty: options.nameProperty,
          popup,
          data: data ? data[0].data : [],
          dataPrefix: props.dataPrefix,
          dataSuffix: props.dataSuffix,
          format: options.format
        });
      };
      const onBlur = (): void => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      };

      map.on('mousemove', COLOURED_LAYER, onHover);
      map.on('mouseleave', COLOURED_LAYER, onBlur);

      return (): void => {
        map.off('mousemove', COLOURED_LAYER, onHover);
        map.off('mouseleave', COLOURED_LAYER, onBlur);
        popup.remove();
      };
    }
  }, [map, loading, data]);
  useEffect(() => {
    if (map && !props.location) {
      map.setCenter(options.center).setZoom(options.zoom || 6.1);
    }
  }, [props.location]);
  useEffect(() => {
    if (map && props.hideParentLayer && map.getLayer(options.layerName)) {
      map.setLayoutProperty(options.layerName, 'visibility', 'none');
    }
  });

  const onLoad = (_map: Map): void => {
    setLoading(false);
    setMap(_map);
    if (props.onLoad) {
      props.onLoad(_map);
    }
  };
  const onAddLayer = (_map: Map, layerID: string): void => {
    if (props.location) {
      _map.setFilter(layerID, ['==', options.nameProperty, props.location.name]);
      _map.setPaintProperty(options.layerName, 'fill-color', '#d1d1d1');
      if (props.locationHandling === 'flyto') {
        flyToLocation(_map, props.location.name, options);
      }
    }
  };

  const renderLayers = (): ReactNode => {
    if (!dataLoading && data && data[0].data.length) {
      return (
        <BaseMapLayer
          id={COLOURED_LAYER}
          source="composite"
          source-layer={options.sourceLayer}
          maxzoom={options.maxZoom && options.maxZoom + 1}
          type="fill"
          paint={{
            'fill-color': {
              property: options.nameProperty,
              type: 'categorical',
              default: '#b3adad',
              stops: getLocationStyles(data[0].data, range, colours, options.format)
            },
            'fill-opacity': 0.75,
            'fill-outline-color': '#ffffff'
          }}
          onAdd={onAddLayer}
        />
      );
    }

    return <BaseMapLayer id={COLOURED_LAYER} show={false} />;
  };

  return (
    <Loading active={loading || !!dataLoading}>
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
        onLoad={onLoad}
      >
        {renderLayers()}
      </BaseMap>
    </Loading>
  );
};

SpotlightMap.defaultProps = {
  level: 0,
  dataLoading: false,
  locationHandling: 'highlight-only'
};

export { SpotlightMap };
