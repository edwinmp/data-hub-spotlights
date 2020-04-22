import center from '@turf/center';
import { Feature, featureCollection, point, Point, Position, Properties } from '@turf/helpers';
import { LngLat, Map, MapboxEvent, MapboxGeoJSONFeature, Popup } from 'mapbox-gl';
import React, { FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { debounce } from 'underscore';
import { CountryContext } from '../../utils';
import { BaseMap, BaseMapLayer } from '../BaseMap';
import { Loading } from '../Loading';
import {
  config,
  getLocationNameFromEvent,
  getLocationStyles,
  getProperLocationName,
  LayerConfig,
  renderTooltip,
  SpotlightMapProps,
  TooltipEvent
} from './utils';

const COLOURED_LAYER = 'highlight';

const getCoordinatesCenter = (coordinates: Position[]): Feature<Point, Properties> => {
  const features = featureCollection(coordinates.map(position => point(position)));

  return center(features);
};

const getLngLatFromFeature = (feature: Feature<Point, Properties>): LngLat | null => {
  const position = feature.geometry?.coordinates;

  return position ? new LngLat(position[0], position[1]) : null;
};

const getPosition = ({ geometry }: MapboxGeoJSONFeature): LngLat | null => {
  if (geometry) {
    if (geometry.type === 'Polygon') {
      const feature = getCoordinatesCenter(geometry.coordinates[0]);

      return getLngLatFromFeature(feature);
    }
    if (geometry.type === 'MultiPolygon') {
      const positions = geometry.coordinates[0][0];
      const feature = getCoordinatesCenter(positions);

      return getLngLatFromFeature(feature);
    }
  }

  return null;
};

const flyToLocation = (map: Map, locationName: string, options: LayerConfig, recenter = true): void => {
  const features = map.querySourceFeatures('composite', {
    sourceLayer: options.sourceLayer,
    filter: ['in', options.nameProperty, getProperLocationName(locationName, options.formatter)]
  });

  if (features && features.length) {
    const position = getPosition(features[0]);
    if (position) {
      map.flyTo({
        center: position,
        zoom: 16
      });
    }
  } else if (recenter) {
    // reset view before next flyTo, otherwise flying to locations not currently visible shall fail
    map.flyTo({ center: options.center, zoom: options.zoom || 6.1 });
    setTimeout(() => {
      flyToLocation(map, locationName, options, false);
    }, 500);
  }
};

const setZoomByContainerWidth = (map: Map, container: HTMLElement, options: LayerConfig): void => {
  if (container.clientWidth < 700) {
    map.setZoom(options.zoom ? options.zoom - 1 : 5);
  } else if (container.clientWidth < 900) {
    map.setZoom(options.minZoom ? options.minZoom + 0.8 : 5.8);
  } else {
    map.setZoom(options.zoom || 6.1);
  }
};

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { level, data, dataLoading, range, colours } = props;
  const { countryCode } = useContext(CountryContext);
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
          formatter: options.formatter
        });
      };
      const onBlur = (): void => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      };

      map.on('mousemove', COLOURED_LAYER, onHover);
      map.on('mouseleave', COLOURED_LAYER, onBlur);

      const onClick = (event: TooltipEvent): void => {
        const locationName = getLocationNameFromEvent(event, options.nameProperty);
        if (locationName) {
          if (props.onClick) {
            props.onClick(locationName, event);
          } else {
            flyToLocation(map, locationName, options);
          }
        }
      };
      const onResize = debounce((event: MapboxEvent) => {
        const container = event.target.getContainer();
        setZoomByContainerWidth(map, container, options);
        onResize.cancel();
      }, 300);

      map.on('click', COLOURED_LAYER, onClick);
      map.on('resize', onResize);

      return (): void => {
        map.off('mousemove', COLOURED_LAYER, onHover);
        map.off('mouseleave', COLOURED_LAYER, onBlur);
        map.off('click', COLOURED_LAYER, onClick);
        map.off('resize', onResize);
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
    setZoomByContainerWidth(_map, _map.getContainer(), options);
    if (props.onLoad) {
      props.onLoad(_map);
    }
  };
  const onAddLayer = (_map: Map, layerID: string): void => {
    if (props.location) {
      _map.setFilter(layerID, [
        '==',
        options.nameProperty,
        getProperLocationName(props.location.name, options.formatter)
      ]);
      _map.setPaintProperty(options.layerName, 'fill-color', '#d1d1d1');
      if (props.locationHandling === 'flyto') {
        setTimeout(() => flyToLocation(_map, props.location?.name as string, options), 500);
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
              default: '#D1CBCF',
              stops: getLocationStyles(data[0].data, range, colours, options.formatter)
            },
            'fill-opacity': 0.75,
            'fill-outline-color': '#ffffff'
          }}
          onAdd={onAddLayer}
        />
      );
    }

    return (
      <BaseMapLayer
        id={COLOURED_LAYER}
        source="composite"
        source-layer={options.sourceLayer}
        maxzoom={options.maxZoom && options.maxZoom + 1}
        type="fill"
        paint={{
          'fill-color': '#D1CBCF',
          'fill-opacity': 0.75,
          'fill-outline-color': '#ffffff'
        }}
        onAdd={onAddLayer}
      />
    );
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
          maxZoom: options.maxZoom || 7,
          scrollZoom: false
        }}
        style={{ width: '100%', background: '#ffffff' }}
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
