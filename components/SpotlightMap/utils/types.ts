import { LocationIndicatorData, SpotlightLocation } from '../../../utils';
import { FeatureCollection, Geometry, MultiPolygon } from 'geojson';
import { Map } from 'mapbox-gl';
import { LayerConfig } from './config';

export interface SpotlightMapProps {
  center?: number[];
  zoom?: number;
  location?: SpotlightLocation;
  level?: number;
  dataLoading?: boolean;
  data?: LocationIndicatorData[];
  range?: string[];
  colours?: string[];
  dataPrefix?: string;
  dataSuffix?: string;
  layerConfig?: LayerConfig;
  hideParentLayer?: boolean;
  locationHandling?: 'flyto' | 'highlight-only'; // highlight-only is the default
  onLoad?: (map: Map) => void;
  onClick?: (locationName?: string) => void;
}

export interface SpotlightMapGeoJSON {
  all?: SpotlightFC;
  filtered?: SpotlightFC;
}

export interface GeoJSONProperties extends SpotlightLocation {
  region?: string;
  geometry: Geometry;
}

export type SpotlightFC = FeatureCollection<MultiPolygon, GeoJSONProperties>;

export interface MapLocations {
  regional: {
    [key: string]: SpotlightLocation[];
  };
  other: SpotlightLocation[];
}
