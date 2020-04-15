import { useRouter } from 'next/router';
import React, { CSSProperties, FunctionComponent, useState, useEffect } from 'react';
import { SpotlightLocation, SpotlightOptions } from '../../utils';
import { Button } from '../Button';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { setLocationsQuery } from '../MapSection/utils';
import { SpotlightBanner } from '../SpotlightBanner';
import { TagList, TagListItem } from '../Tags';

interface ComparisonWrapperProps {
  countryName: string;
  countryCode: string;
  onCompare?: (locations: SpotlightLocation[]) => void;
  locations?: SpotlightLocation[];
  options: SpotlightOptions;
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = props => {
  const [locations, setLocations] = useState<SpotlightLocation[]>(props.locations ? props.locations : []);
  const router = useRouter();
  useEffect(() => {
    if (locations.length < 2 && props.onCompare) {
      props.onCompare(locations);
    }
  }, [locations]);

  const onSelectLocation = (location?: SpotlightLocation): void => {
    if (
      location &&
      locations.findIndex(_location => _location.name.toLowerCase() === location.name.toLowerCase()) === -1
    ) {
      const updatedLocations = locations.concat(location);
      setLocations(updatedLocations);
      setLocationsQuery(router, props.options, updatedLocations);
    }
  };
  const onCloseTag = (tagName: string): void => {
    const updatedLocations = locations.filter(location => location.name.toLowerCase() !== tagName.toLowerCase());
    setLocations(updatedLocations);
    setLocationsQuery(router, props.options, updatedLocations);
  };
  const onClickCompare = (): void => {
    if (props.onCompare) {
      props.onCompare(locations);
    }
  };

  return (
    <>
      <LocationSelectionBanner
        countryName={props.countryName}
        countryCode={props.countryCode}
        onSelectLocation={onSelectLocation}
        selectStyles={{
          container: (provided): CSSProperties => ({
            ...provided,
            maxWidth: '300px',
            fontSize: '1.6rem',
            width: '100%'
          })
        }}
        heading="Add Location"
      ></LocationSelectionBanner>
      {locations.length ? (
        <SpotlightBanner>
          <TagList>
            {locations.map(location => (
              <TagListItem key={location.geocode} label={location.name} onRemove={onCloseTag} />
            ))}
          </TagList>
          {locations.length >= 2 ? (
            <Button className="button button--compare" onClick={onClickCompare}>
              Compare
            </Button>
          ) : null}
        </SpotlightBanner>
      ) : null}
    </>
  );
};

export { LocationComparisonBanner };
