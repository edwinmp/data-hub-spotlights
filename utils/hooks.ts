import { useEffect, useState, useContext } from 'react';
import { getBoundariesByCountryCode, sortBoundariesByName, SpotlightBoundary } from './locations';
import { CountryContext } from './context';

export const useBoundaries = (): SpotlightBoundary[] => {
  const { countryCode } = useContext(CountryContext);
  const [boundaries, setBoundaries] = useState<SpotlightBoundary[]>([]);

  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => setBoundaries(sortBoundariesByName(boundaries)));
  }, [countryCode]);

  return boundaries;
};
