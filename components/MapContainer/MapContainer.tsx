import React from 'react';
import { Select } from '../Select';
import { Map } from '../Map';
import ugandaDistricts from '../../geoJSON/district.json';
import ugandasubcounties from '../../geoJSON/subcounty.json';
import * as distance from 'jaro-winkler';
import * as turf from '@turf/turf';

const mapContainerStyle = {
  padding: '50px'
};

interface State {
  leaflet: any;
  map: any;
  selectedDistrict: string;
  boundaryType: string;
  subcountyDropdownOptions: any[];
  selectedSubcounty: string;
}

class MapContainer extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      leaflet: {},
      map: {},
      selectedDistrict: '',
      selectedSubcounty: '',
      boundaryType: 'all',
      subcountyDropdownOptions: []
    };
    this.handleSubcountyChange = this.handleSubcountyChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.initialiseMapState = this.initialiseMapState.bind(this);
  }

  initialiseMapState(L: any, map: any) {
    this.setState({ leaflet: L, map }, () => {
      this.addLayer();
    });
  }

  loadDistrictSelect(districts: any) {
    const options = [];
    for (const district in districts.features) {
      if (districts.features) {
        options.push({
          value: districts.features[district].properties.DNAME2014,
          label: districts.features[district].properties.DNAME2014
        });
      }
    }

    return options;
  }

  loadSubcountySelect(subcounties: any) {
    const options = [];
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        options.push({
          value: subcounties[subcounty].properties.SName2016,
          label: subcounties[subcounty].properties.SName2016
        });
      }
    }

    return options;
  }

  handleDistrictChange(selectedOption: any) {
    const districtSubcounties = this.findSelectedDistrictSubcounties(selectedOption.value, ugandasubcounties);
    const subcountyOptions = this.loadSubcountySelect(districtSubcounties);

    this.setState({
      selectedDistrict : selectedOption.value,
      boundaryType : 'district',
      subcountyDropdownOptions: subcountyOptions
    }, () => {
      this.addLayer();
    });
  }

  handleSubcountyChange(selectedOption: any) {
    this.setState({
      selectedSubcounty : selectedOption.value,
      boundaryType : 'subcounty'
    }, () => {
      this.addLayer();
    });
  }

  addLayer() {
    switch (this.state.boundaryType) {
      case 'all':
        this.showAllUgandaDistricts();
        break;
      case 'district':
        this.showOneUgandaDistrict();
        break;
      case 'subcounty':
        this.showUgandaDistrictSubcounties();
        break;
      default:
        break;
    }
  }

  clean_map() {
    this.state.map.eachLayer((layer: any) => {
      if (layer instanceof this.state.leaflet.GeoJSON) {
        this.state.map.removeLayer(layer);
      }
    });
  }

  redrawMap(featureCollection: any) {
    const layer = this.state.leaflet.geoJson(featureCollection, {
      style: {
        color: '#00008b',
        weight: 1,
        opacity: 0.65
      }
    });
    layer.addTo(this.state.map);
  }

  showAllUgandaDistricts() {
    this.redrawMap(ugandaDistricts);
  }

  showOneUgandaDistrict() {
    const districtSubcounties = this.findSelectedDistrictSubcounties(this.state.selectedDistrict, ugandasubcounties);
    this.clean_map();
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        this.redrawMap(districtSubcounties[key]);
      }
    }
    const center: any = this.getCenterOfFeatureCollection(districtSubcounties);
    this.state.map.flyTo([
      center.geometry.coordinates[1],
      center.geometry.coordinates[0]
    ], 10);
  }

  showUgandaDistrictSubcounties() {
    const districtSubcounties = this.findSelectedDistrictSubcounties(this.state.selectedDistrict, ugandasubcounties);
    this.clean_map();

    for (const subcounty in districtSubcounties) {
      if (districtSubcounties[subcounty]) {
        const similarity = distance(
          this.state.selectedSubcounty.toLowerCase(),
          districtSubcounties[subcounty].properties.SName2016.toLowerCase()
        );
        if (similarity > 0.9) {
          this.redrawMap(districtSubcounties[subcounty]);
          const center: any = this.getCenterOfSubcountyFeatureCollection(districtSubcounties[subcounty]);
          this.state.map.flyTo([
            center.geometry.coordinates[1],
            center.geometry.coordinates[0]
          ], 11);
        }
      }
    }
  }

  findSelectedDistrictSubcounties(district: string, allSubcounties: any) {
    const selectedGeometry = [];
    const subcounties = allSubcounties.features;
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        const current_district = subcounties[subcounty].properties.DName2016;
        const similarity = distance(district.toLowerCase(), current_district.toLowerCase());
        if (similarity > 0.9) {
          selectedGeometry.push(subcounties[subcounty]);
        }
      }
    }

    return selectedGeometry;
  }

  getCenterOfFeatureCollection(districtSubcounties: any) {
    const points = [];
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

  getCenterOfSubcountyFeatureCollection(districtSubcounties: any) {
    const points = [];
    const coords = districtSubcounties.geometry.coordinates[0][0];
    for (const item in coords) {
      if (coords[item]) {
        points.push(turf.point(coords[item]));
      }
    }
    const features = turf.featureCollection(points);

    return turf.center(features);
  }

  render() {
    return (
      <div style={ { padding: '20px' } }>
        <div style={ { margin: '10px' } }>
        <Select options={ this.loadDistrictSelect(ugandaDistricts) } onChange={ this.handleDistrictChange }/>
        </div>
        <div style={ { margin: '10px' } }>
        <Select options={ this.state.subcountyDropdownOptions } onChange={ this.handleSubcountyChange }/>
        </div>
        <div style={ mapContainerStyle }>
          <Map saveMapState={ this.initialiseMapState } />
        </div>
      </div>
    );
  }
}

export { MapContainer };
