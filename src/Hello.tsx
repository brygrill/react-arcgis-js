import { loadCss, loadModules } from 'esri-loader';
import * as React from 'react';

export interface IHelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<IHelloProps, {}> {
  public componentDidMount() {
    loadCss('https://js.arcgis.com/4.6/esri/css/main.css');
    loadModules(['esri/views/MapView', 'esri/WebMap'])
      .then(([MapView, WebMap]) => {
        const map = new WebMap({
          portalItem: {
            id: 'f2e9b762544945f390ca4ac3671cfa72'
          }
        });
        const view = new MapView({
          map,
          container: this.map,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  public render() {
    return (
      <div>
        <div className="map">
          <div ref={(map) => { this.map = map; }} />
        </div>
      </div>
    );
  }
}
