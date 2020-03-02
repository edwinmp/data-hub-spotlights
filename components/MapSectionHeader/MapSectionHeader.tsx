import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation, createLocationOptions, getBoundariesByCountryCode } from '../../utils';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';

interface MapSectionHeaderProps {
  countryCode: string;
  onSelectLocation: (location?: SpotlightLocation) => void;
}

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(props.countryCode).then(boundaries => {
      setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
    });
  }, [props.countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    props.onSelectLocation(option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };

  return (
    <SpotlightBanner header>
      <SpotlightBannerAside>
        <Select
          options={options}
          onChange={onSelectLocation}
          placeholder="Select Location"
          isLoading={!(options && options.length)}
          chooseTheme="dark"
          isClearable
        />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <SpotlightBannerForm />
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
