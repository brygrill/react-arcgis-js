import { loadModules } from 'esri-loader';

// https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#event:click
export interface IEventInterface {
  mapPoint: object;
  x: Number;
  y: Number;
  button: Number;
  type: String;
  stopPropagation: Function;
  timestamp: Number;
  native: object;
}

// https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
export interface IViewProperties {
  on: Function;
  hitTest: Function;
}

export const loadMapModules = (modules: Array<string>, moduleOptions?: object) => {
  if (modules.length < 1) {
    throw new Error();
  }
  return loadModules(modules, moduleOptions)
    .then(([MapView, Map]) => {
      return { MapView, Map };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export const loadFeatureLayerModule = (moduleOptions?: object) => {
  return loadModules(['esri/layers/FeatureLayer'], moduleOptions)
    .then(([FeatureLayer]) => {
      return FeatureLayer;
    })
    .catch(err => {
      throw new Error(err);
    });
};