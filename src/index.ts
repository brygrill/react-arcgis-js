import { ILoadScriptOptions, loadModules } from 'esri-loader';
import * as Hello from './Hello';

const Hi = {
  Hello: Hello.Hello,
  esriLoader: loadModules,
};

export default Hi;

export const HelloThere = Hi.Hello;
