import React from 'react';
import { Select } from '../Select';
import { Map } from '../Map';
import ugandaDistricts from '../../geoJSON/ugandadistricts.json';
import ugandasubcounties from '../../geoJSON/ubos_subcounties_features.json';
let distance = require('jaro-winkler');


const mapContainerStyle = {
  padding: "50px"
};

interface State {
  leaflet: {};
  map: {},
  selectedDistrict: string,
  boundaryType: string,
  subcountyDropdownOptions: any[],
  selectedSubcounty: string
}

class MapContainer extends React.Component<{}, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      leaflet: {},
      map: {},
      selectedDistrict: "",
      selectedSubcounty: "",
      boundaryType: "all",
      subcountyDropdownOptions: []
    };
  }

  loadDistrictSelect(districts:any) {
    const options = [];
    for(const district in districts.features){
      options.push({
        value: districts.features[district].properties.DNAME2014,
        label: districts.features[district].properties.DNAME2014
      });
    }
    return options;
  }

  loadSubcountySelect(subcounties:any) {
    const options = [];
    for(const subcounty in subcounties){
      options.push({
        value: subcounties[subcounty].properties.SName2016,
        label: subcounties[subcounty].properties.SName2016
      });
    }
    return options;
  }

  handleDistrictChange(selectedOption: any) {
    let districtSubcounties = this.findSelectedDistrictSubcounties(selectedOption.value);
    let subcountyOptions = this.loadSubcountySelect(districtSubcounties);

    this.setState({
      selectedDistrict : selectedOption.value,
      boundaryType : "district",
      subcountyDropdownOptions: subcountyOptions
    });
  };

  handleSubcountyChange(selectedOption: any) {
    this.setState({
      selectedSubcounty : selectedOption.value,
      boundaryType : "subcounty"
    });
  };

  findSelectedDistrictSubcounties(district: string) {
    var selectedGeometry = [],
    subcounties = ugandasubcounties.features;
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
    return (
      <div style={ { padding: '20px' } }>
        <div style={ { margin: '10px' } }>
        <Select options={ this.loadDistrictSelect(ugandaDistricts) } onChange={this.handleDistrictChange.bind(this)}/>
        </div>
        <div style={ { margin: '10px' } }>
        <Select options={ this.state.subcountyDropdownOptions } onChange={this.handleSubcountyChange.bind(this)}/>
        </div>
        <div style = {mapContainerStyle}>
          <Map
            district={this.state.selectedDistrict}
            subcounty={this.state.selectedSubcounty}
            boundaryType={this.state.boundaryType}
            findSubcounties={this.findSelectedDistrictSubcounties}
          />
        </div>
      </div>
    )
  }
}

export { MapContainer };
