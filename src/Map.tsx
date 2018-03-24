import { loadModules } from 'esri-loader';
import * as React from 'react';

export interface IMapProps {
  itemId: string;
  baseMap: string;
}

export interface IMapState {
  loading: boolean;
  error: boolean;
  container: string;
  modules: Array<string>;
  mapOptions: object;
  map: object;
  view: object;
}

export class Map extends React.Component<IMapProps, IMapState> {
  public static defaultProps: Partial<IMapProps> = {
    baseMap: 'streets',
  };

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      container: 'my-map',
      modules: props.itemId
        ? ['esri/views/MapView', 'esri/WebMap']
        : ['esri/views/MapView', 'esri/Map'],
      mapOptions: props.itemId
        ? {
            portalItem: {
              id: this.props.itemId,
            },
          }
        : {
            basemap: this.props.baseMap,
          },
      map: {},
      view: {},
    };
  }

  createMap = () => {
    loadModules(['esri/views/MapView', 'esri/WebMap'])
      .then(([MapView, Map]) => {
        const map = new Map(this.state.mapOptions);
        const view = new MapView({
          map,
          container: this.state.container,
        });
        this.setState({ loading: false, map, view });
      })
      .catch((e: Error) => {
        this.setState({ loading: false, error: true });
      });
  };

  componentDidMount() {
    this.createMap();
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const childEl = child as React.ReactElement<any>;
      return React.cloneElement(childEl, { ...this.state });
    });

    return (
      <div style={{height: '500px'}}>
        <div
          id={this.state.container}
          style={{ height: '100%', width: '100%' }}
        />
        {childrenWithProps}
      </div>
    );
  }
}
