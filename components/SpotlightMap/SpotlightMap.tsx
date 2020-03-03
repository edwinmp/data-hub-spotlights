import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { BaseMap, BaseMapLayer } from '../BaseMap';
import { Loading } from '../Loading';
import { config, getLocationStyles, SpotlightMapProps, renderTooltip, TooltipEvent } from './utils';
import { Map, Popup } from 'mapbox-gl';

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, level, data, dataLoading, range, colours } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const { layers } = config[countryCode];
  const options = level && level <= layers.length ? layers[level] : layers[0];

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

      map.on('mousemove', 'highlight', onHover);
      map.on('mouseleave', 'highlight', onBlur);

      return (): void => {
        map.off('mousemove', 'highlight', onHover);
        map.off('mouseleave', 'highlight', onBlur);
        popup.remove();
      };
    }
  }, [map, loading, data]);

  const onLoad = (map: Map): void => {
    setLoading(false);
    setMap(map);
  };

  const renderLayers = (): ReactNode => {
    if (!dataLoading && data && data[0].data.length) {
      return (
        <BaseMapLayer
          id="highlight"
          source="composite"
          source-layer={options.source}
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
        />
      );
    }

    return <BaseMapLayer id="highlight" show={false} />;
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
  dataLoading: false
};

export { SpotlightMap };
