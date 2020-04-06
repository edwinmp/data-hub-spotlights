import React, { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation } from '../../utils';
import { Button } from '../Button';
import { ButtonBanner } from '../ButtonBanner';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { SpotlightBanner } from '../SpotlightBanner';
import { TagList, TagListItem } from '../Tags';
import { Alert } from '../Alert';
import { Icon } from '../Icon';

interface ComparisonWrapperProps {
  countryName: string;
  countryCode: string;
  onCompare?: (locations: SpotlightLocation[]) => void;
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = props => {
  const [addLocation, setAddLocation] = useState(false);
  const [locations, setLocations] = useState<SpotlightLocation[]>([]);
  useEffect(() => {
    const theLocation = localStorage.getItem('location');
    if (theLocation) {
      const queryLocation: SpotlightLocation[] = [JSON.parse(theLocation.toString())];
      setLocations(queryLocation);
    }
  }, []);

  const toggleAddLocation = (): void => setAddLocation(!addLocation);
  const onSelectLocation = (location?: SpotlightLocation): void => {
    if (location && locations.findIndex(_location => _location.name === location.name) === -1) {
      setLocations(locations.concat(location));
      setAddLocation(false); // TODO: determine whether to move this outside of condition
    }
  };
  const onCloseTag = (tagName: string): void => setLocations(locations.filter(location => location.name !== tagName));
  const onClickCompare = (): void => {
    if (props.onCompare) {
      props.onCompare(locations);
    }
  };

  return (
    <>
      {addLocation ? (
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
        >
          <Button className="countries__searched-cancel" onClick={toggleAddLocation}>
            <span>Cancel</span>
          </Button>
        </LocationSelectionBanner>
      ) : (
        <ButtonBanner onClick={toggleAddLocation} className="m-text-link add-location-link">
          <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
          <span>Add Location</span>
        </ButtonBanner>
      )}
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
      ) : (
        <Alert variant="notice">
          <Icon name="arrow-up-slate" />
          <p>To get started add a location</p>
        </Alert>
      )}
    </>
  );
};

export { LocationComparisonBanner };
