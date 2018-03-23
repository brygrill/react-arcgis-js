import { loadCss, loadModules } from 'esri-loader';
import * as React from 'react';

export interface IMapProps {
  itemId: string;
}

export class Map extends React.Component<IMapProps, {}> {
  public static defaultProps: Partial<IMapProps> = {
    itemId: 'f2e9b762544945f390ca4ac3671cfa72',
  };
  public componentDidMount() {
    loadModules(['esri/views/MapView', 'esri/WebMap'])
      .then(([MapView, WebMap]) => {
        const map = new WebMap({
          portalItem: {
            id: this.props.itemId,
          },
        });
        const view = new MapView({
          map,
          container: 'my-map',
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  public render() {
    return <div id="my-map" style={{ height: '100%', width: '100%' }} />;
  }
}
