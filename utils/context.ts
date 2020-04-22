import { createContext } from 'react';
import { SpotlightLocation } from '.';
import { CountryInfo } from './data';

export const LocationContext = createContext<SpotlightLocation | undefined>(undefined);
export const CountryContext = createContext<CountryInfo>({ countryCode: '', countryName: '', currencyCode: '' });
