import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation, createLocationOptions, getBoundariesByCountryCode, SpotlightBoundary } from '../../utils';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { BoundaryMenu } from '../BoundaryMenu';

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

  const onSelectLocation = (option?: SelectOption): void => {
    props.onSelectLocation(option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };

  return (
    <SpotlightBanner header>
      <SpotlightBannerAside>
        <BoundaryMenu countryName={props.countryName} boundaries={boundaries} />
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
