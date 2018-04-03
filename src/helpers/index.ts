import { loadModules } from 'esri-loader';

export const loadMapModules = (modules: Array<string>, moduleOptions: object) => {
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

export const loadFeatureLayerModule = (moduleOptions: object) => {
  return loadModules(['esri/layers/FeatureLayer'], moduleOptions)
    .then(([FeatureLayer]) => {
      return FeatureLayer;
    })
    .catch(err => {
      throw new Error(err);
    });
};