import React, { useEffect } from 'react';

const style = {
  width: '100%',
  height: '600px'
};

interface MapProps {
  saveMapState: (arg0: any, arg1: any) => void;
}

const Map = ({ saveMapState }: MapProps) => {
  useEffect(() => {
    const L = require('leaflet');

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

  return <div id="map" style={ style } />;
};

export { Map };
