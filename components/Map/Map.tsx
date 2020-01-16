import React from 'react';
import districtJson from '../../geoJSON/district.json';
import subcountyJson from '../../geoJSON/subcounty.json';
import * as turf from '@turf/turf';
import * as distance from 'jaro-winkler';

const style = {
  width: '100%',
  height: '600px'
};

interface MapProps {
  district: string,
  subcounty: string,
  boundaryType: string,
  findSubcounties: Function
}

interface State {
  leaflet: {};
  map: {};
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

    this.addLayer(L, map);
    this.setState({ leaflet: L });
    this.setState({ map });
  }

  componentDidUpdate(prevProps:MapProps) {
    if (prevProps.boundaryType !== this.props.boundaryType ||
      prevProps.district !== this.props.district ||
      prevProps.subcounty !== this.props.subcounty) {
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
      case 'subcounty':
        this.showUgandaDistrictSubcounties(L, map);
        break;
      default:
        break;
    }
  }

  clean_map(L: any, map: any) {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });
  }

  redrawMap(L: any, map: any, featureCollection: any) {
    const layer = L.geoJson(featureCollection, {
      style: {
        color: '#00008b',
        weight: 1,
        opacity: 0.65
      }
    });
    layer.addTo(map);
  }

  showAllUgandaDistricts(L: any, map: any) {
    this.redrawMap(L, map, districtJson);
  }

  showOneUgandaDistrict(L: any, map: any) {
    let districtSubcounties = this.props.findSubcounties(this.props.district);
    this.clean_map(L, map);
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        this.redrawMap(L, map, districtSubcounties[key]);
      }
    }
    const center: any = this.getCenterOfFeatureCollection(districtSubcounties);
    map.flyTo([
      center.geometry.coordinates[1],
      center.geometry.coordinates[0]
    ], 10);
  }

  showUgandaDistrictSubcounties(L: any, map: any) {
    let districtSubcounties = this.props.findSubcounties(this.props.district);
    this.clean_map(L, map);

    for(const subcounty in districtSubcounties){
      var similarity = distance(this.props.subcounty.toLowerCase(), districtSubcounties[subcounty].properties.SName2016.toLowerCase());
      if (similarity > 0.9) {
        this.redrawMap(L, map, districtSubcounties[subcounty]);
        let center:any = this.getCenterOfSubcountyFeatureCollection(districtSubcounties[subcounty]);
        let lon = center.geometry.coordinates[1];
        let lat = center.geometry.coordinates[0];
        map.flyTo([lon, lat], 11);
      }
    }
  }

  getCenterOfFeatureCollection(districtSubcounties:any){
    var points = [];
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        for (const item in districtSubcounties[key].geometry.coordinates[0][0]) {
          if (districtSubcounties[key].geometry.coordinates[0][0]) {
            points.push(turf.point(districtSubcounties[key].geometry.coordinates[0][0][item]));
          }
        }
      }
    }

    return turf.center(turf.featureCollection(points));
  }

  getCenterOfSubcountyFeatureCollection(districtSubcounties:any){
    var points = [];
    var coords = districtSubcounties.geometry.coordinates[0][0];
    for (const item in coords) {
      points.push(turf.point(coords[item]));
    }
    var features = turf.featureCollection(points);
    return turf.center(features);
  }

  render() {
    return <div id="map" style={ style } />;
  }
}

export { Map };
