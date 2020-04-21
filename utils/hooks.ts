import { useEffect, useState } from 'react';
import { getBoundariesByCountryCode, sortBoundariesByName, SpotlightBoundary } from './locations';

export const useBoundaries = (countryCode: string): SpotlightBoundary[] => {
  const [boundaries, setBoundaries] = useState<SpotlightBoundary[]>([]);

  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => setBoundaries(sortBoundariesByName(boundaries)));
  }, [countryCode]);

  return boundaries;
};
