import React, { FunctionComponent, useEffect, useState } from 'react';
import { createLocationOptions, getBoundariesByCountryCode, SpotlightBoundary, SpotlightLocation } from '../../utils';
import { BoundaryMenu } from '../BoundaryMenu';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { MenuListItem } from '../SpotlightMenu';

interface MapSectionHeaderProps {
  countryCode: string;
  countryName: string;
  onSelectLocation: (location?: SpotlightLocation) => void;
}

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [boundaries, setBoundaries] = useState<SpotlightBoundary[]>([]);
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(props.countryCode).then(boundaries => {
      setBoundaries(boundaries);
    });
  }, [props.countryCode]);
  useEffect(() => {
    setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
  }, [boundaries]);

  const onSelectLocation = (option?: SelectOption | MenuListItem): void => {
    props.onSelectLocation(option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };

  return (
    <SpotlightBanner header>
      <SpotlightBannerAside>
        <BoundaryMenu countryName={props.countryName} boundaries={boundaries} onSelectLocation={onSelectLocation} />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <Select
          options={options}
          onChange={onSelectLocation}
          placeholder="Select Location"
          isLoading={!(options && options.length)}
          chooseTheme="dark"
          isClearable
        />
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
