import { ILoadScriptOptions, loadModules } from 'esri-loader';
import * as MapComponent from './components/Map';

const reactArcGisJS = {
  Map: MapComponent.Map,
  esriLoader: loadModules,
};

export default reactArcGisJS;

export const Map = reactArcGisJS.Map;
