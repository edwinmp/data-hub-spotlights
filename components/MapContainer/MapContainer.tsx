import React from 'react';
import { Select } from '../Select';
import { Map } from '../Map';
import ugandaDistricts from '../../geoJSON/ugandadistricts.json';


const mapContainerStyle = {
  padding: "50px"
};

interface State {
  leaflet: {};
  map: {},
  selectedDistrict: string,
  boundaryType: string
}

class MapContainer extends React.Component<{}, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      leaflet: {},
      map: {},
      selectedDistrict: "",
      boundaryType: "all",
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

  handleChange(selectedOption: any) {
    this.setState({
      selectedDistrict : selectedOption.value,
      boundaryType : "district"
    });
  };

  render() {
    return (
      <div style={ { padding: '20px' } }>
        <div>
        <Select options={ this.loadDistrictSelect(ugandaDistricts) } onChange={this.handleChange.bind(this)}/>
        </div>
        <div style = {mapContainerStyle}>
          <Map district={this.state.selectedDistrict} boundaryType={this.state.boundaryType} />
        </div>
      </div>
    )
  }
}

export { MapContainer };
