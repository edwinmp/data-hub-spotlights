import React, { useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
  saveMapState: (arg0: any, arg1: any) => void;
  width: string;
  height: string;
}

const Map = ({ saveMapState, width, height }: MapProps) => {
  useEffect(() => {

    // create map
    const map = L.map('map', {
      center: [ 0.6976, 32.5825 ],
      zoom: 7,
      layers: [
        L.tileLayer('https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA', {
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
