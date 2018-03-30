import { loadModules } from 'esri-loader';

export enum BaseMapOptions {
  streets = 'streets',
  satellite = 'satellite',
  hybrid = 'hybrid',
  topo = 'topo',
  gray = 'gray',
  dark_gray = 'dark-gray',
  oceans = 'oceans',
  national_geographic = 'national-geographic',
  terrain = 'terrain',
  osm = 'osm',
  dark_gray_vector = 'dark-gray-vector',
  gray_vector = 'gray-vector',
  streets_vector = 'streets-vector',
  topo_vector = 'topo-vector',
  streets_night_vector = 'streets-night-vector',
  streets_relief_vector = 'streets-relief-vector',
  streets_navigation_vector = 'streets-navigation-vector'
}

export const moduleLoader = (modules: Array<string>, moduleOptions: object) => {
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