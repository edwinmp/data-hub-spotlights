import React from 'react';
import ugandaDistricts from '../../geoJSON/ugandadistricts.json';
import ugandaSubcounties from '../../geoJSON/ubos_subcounties_features.json';
import * as turf from '@turf/turf';
let distance = require('jaro-winkler');


const style = {
  width: "100%",
  height: "600px"
};

interface MapProps {
  district: string,
  boundaryType: string
}

interface State {
  leaflet: {};
  map: {}
}

class Map extends React.Component<MapProps, State> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      leaflet: {},
      map: {}
    };
  }

  componentDidMount() {
    let L = require('leaflet');

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

    this.addLayer(L, map)
    this.setState({ leaflet: L });
    this.setState({ map: map });
  }

  componentDidUpdate(prevProps:MapProps) {
    if (prevProps.boundaryType !== this.props.boundaryType || prevProps.district !== this.props.district) {
      this.addLayer(this.state.leaflet, this.state.map);
    }
  }

  addLayer(L: any, map: any) {
    switch (this.props.boundaryType) {
      case 'all':
        this.showAllUgandaDistricts(L, map);
        break;
      case 'district':
        this.showOneUgandaDistrict(L, map);
        break;
      default:
        break;
    }
  }

  clean_map(L: any, map: any) {
    map.eachLayer(function (layer: any) {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });
  }

  redrawMap(L: any, map: any, featureCollection: any) {
    var layer = L.geoJson(featureCollection, {
      style: {
        "color": "#00008b",
        "weight": 1,
        "opacity": 0.65
      }
    });
    layer.addTo(map);
  }

  showAllUgandaDistricts(L: any, map: any) {
    this.redrawMap(L, map, ugandaDistricts);
  }

  showOneUgandaDistrict(L: any, map: any) {
    let districtSubcounties = this.findSelectedDistrictSubcounties(this.props.district);
    this.clean_map(L, map);
    for (const key in districtSubcounties) {
      this.redrawMap(L, map, districtSubcounties[key]);
    }
    let center:any = this.getCenterOfFeatureCollection(districtSubcounties);
    let lon = center.geometry.coordinates[1];
    let lat = center.geometry.coordinates[0];
    map.flyTo([lon, lat], 10);
  }

  getCenterOfFeatureCollection(districtSubcounties:any){
    var points = [];
    for (const key in districtSubcounties) {
      var coords = districtSubcounties[key].geometry.coordinates[0][0];
      for (const item in coords) {
        points.push(turf.point(coords[item]));
      }
    }
    console.log(points);
    var features = turf.featureCollection(points);
    return turf.center(features);
  }

  findSelectedDistrictSubcounties(district: string) {
    var selectedGeometry = [],
      subcounties = ugandaSubcounties.features;
    for (var subcounty in subcounties) {
      var current_district = subcounties[subcounty].properties.DName2016;
      var similarity = distance(district.toLowerCase(), current_district.toLowerCase());
      if (similarity > 0.9) {
        selectedGeometry.push(subcounties[subcounty]);
      }
    }
    return selectedGeometry;
  }

  render() {
    return <div id="map" style={style}></div>
  }
}

export { Map };
