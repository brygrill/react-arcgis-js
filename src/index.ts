import { ILoadScriptOptions, loadModules } from 'esri-loader';
import * as FeatureComponent from './components/Feature';
import * as MapComponent from './components/Map';

const reactArcGisJS = {
  Map: MapComponent.Map,
  Feature: FeatureComponent.Feature,
  esriLoader: loadModules,
};

export default reactArcGisJS;

export const Map = reactArcGisJS.Map;
export const Feature = reactArcGisJS.Feature;
