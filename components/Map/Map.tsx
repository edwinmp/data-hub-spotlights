import React, { useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
  saveMapState: (leafletObject: any, map: L.Map) => void;
  width?: string;
  height?: string;
  mapCenter?: L.LatLng;
  zoom?: number;
  layers: L.TileLayer[];
}

const Map = ({ saveMapState, width, height, layers, mapCenter, zoom }: MapProps) => {
  useEffect(() => {
    // create map
    const map = L.map('map', {
      center: mapCenter,
      zoom,
      layers
    });
    saveMapState(L, map);
  }, []);

  return <div id="map" style={ { width, height } } />;
};

Map.defaultProps = {
  width: '100%',
  height: '600px',
  zoom: 7
};

export { Map };
