import React, { useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
  saveMapState: (arg0: any, arg1: any) => void;
  width: string;
  height: string;
  mapCenter: any;
  zoom: number;
  layer: string;
}

const Map = ({ saveMapState, width, height, layer, mapCenter, zoom }: MapProps) => {
  useEffect(() => {
    // create map
    const map = L.map('map', {
      center: mapCenter,
      zoom,
      layers: [
        L.tileLayer(layer, {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
    saveMapState(L, map);
  }, []);

  return <div id="map" style={ { width, height } } />;
};

Map.defaultProps = {
  width: '100%',
  height: '600px'
};

export { Map };
