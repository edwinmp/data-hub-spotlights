import React from 'react';
import ugandaDistricts from '../../geoJSON/ugandadistricts.json';

const style = {
  width: "100%",
  height: "600px"
};

class Map extends React.Component {
  state = {
    L: {},
    map: {},
  }

  componentDidMount() {
    let L = require('leaflet');

    let d = ugandaDistricts;

    console.log(d);

    // create map
    let map = L.map('map', {
      center: [0.6976, 32.5825],
      zoom: 7,
      layers: [
        L.tileLayer('https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    var layer = L.geoJson(ugandaDistricts, {
      style: {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
      }
    });
    layer.addTo(map);

    this.setState({ L: L });
    this.setState({ map: map });
  }

  render() {
    return <div id="map" style={style}></div>
  }
}

export { Map };
