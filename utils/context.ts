import { createContext } from 'react';
import { SpotlightLocation } from '.';

export const LocationContext = createContext<SpotlightLocation | undefined>(undefined);
