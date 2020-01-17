import React from 'react';
import { Select } from '../Select';
import { Map } from '../Map';
import ugandaDistricts from '../../geoJSON/district.json';
import ugandasubcounties from '../../geoJSON/subcounty.json';
import * as distance from 'jaro-winkler';

const mapContainerStyle = {
  padding: '50px'
};

interface State {
  leaflet: {};
  map: {};
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
    });
  }

  handleSubcountyChange(selectedOption: any) {
    this.setState({
      selectedSubcounty : selectedOption.value,
      boundaryType : 'subcounty'
    });
  };

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
          <Map
            district={ this.state.selectedDistrict }
            subcounty={ this.state.selectedSubcounty }
            boundaryType={ this.state.boundaryType }
            findSubcounties={ this.findSelectedDistrictSubcounties }
          />
        </div>
      </div>
    );
  }
}

export { MapContainer };
