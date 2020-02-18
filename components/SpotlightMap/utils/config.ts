export const config = {
  UG: {
    layers: [
      {
        type: 'shapefile', // can be shapefile or geojson - controls how the layer is handled
        style: 'mapbox://styles/edwinmp/ck6an0ra90nob1ikvysfmbg15/draft', // mapbox style url
        source: 'uganda_districts_2019_i-9qg3nj', // mapbox source-layer ID - found under Select data -> Source
        zoom: 6.1,
        minZoom: 6,
        maxZoom: 7,
        nameProperty: 'DName2019', // the data property on the layer that corresponds to the location's name
        codeProperty: 'dc2018' // the data property on the layer that corresponds to the location's code
      }
    ]
  }
};
