export interface LayerConfig {
  type: 'shapefile' | 'geojson'; // can be shapefile or geojson - controls how the layer is handled
  style: string; // mapbox style url
  source: string; // mapbox source-layer ID - found under Select data -> Source
  center: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  nameProperty: string; // the data property on the layer that corresponds to the location's name
  codeProperty: string; // the data property on the layer that corresponds to the location's code
}

interface MapConfig {
  layers: LayerConfig[];
}

export const config: { [key: string]: MapConfig } = {
  UG: {
    layers: [
      {
        type: 'shapefile', // can be shapefile or geojson - controls how the layer is handled
        style: 'mapbox://styles/edwinmp/ck6an0ra90nob1ikvysfmbg15/draft', // mapbox style url
        source: 'uganda_districts_2019_i-9qg3nj', // mapbox source-layer ID - found under Select data -> Source
        center: [32.655221, 1.344666],
        zoom: 6.1,
        minZoom: 6,
        maxZoom: 7,
        nameProperty: 'DName2019', // the data property on the layer that corresponds to the location's name
        codeProperty: 'dc2018' // the data property on the layer that corresponds to the location's code
      }
    ]
  }
};
