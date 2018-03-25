import { loadModules } from 'esri-loader';
import * as React from 'react';

import { Container } from './Container';

export interface IMapProps {
  onLoading: any;
  onError: any;
  itemId: string;
  baseMap: string;
  height: string;
  width: string;
}

export interface IMapState {
  loading: boolean;
  error: boolean;
  containerId: string;
  modules: Array<string>;
  mapOptions: object;
  map: object;
  view: object;
}

export class Map extends React.Component<IMapProps, IMapState> {
  public static defaultProps: Partial<IMapProps> = {
    onLoading: 'Loading...',
    onError: 'Error loading map...',
    baseMap: 'streets',
  };

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      containerId: Math.random()
        .toString(36)
        .substr(2, 15),
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
    loadModules(this.state.modules)
      .then(([MapView, Map]) => {
        const map = new Map(this.state.mapOptions);
        const view = new MapView({
          map,
          container: this.state.containerId,
        });
        this.setState({ loading: true, map, view });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  componentDidMount() {
    this.createMap();
  }

  render() {
    // on loading render loader
    if (this.state.loading) {
      return (
        <Container
          height={this.props.height}
          width={this.props.width}
          onError={this.props.onError}
          id={this.state.containerId}
        >
          {this.props.onLoading}
        </Container>
      );
    }

    // if error render error msg
    if (this.state.error) {
      return (
        <Container
          height={this.props.height}
          width={this.props.width}
          onError={this.props.onError}
          id={this.state.containerId}
        >
          {this.props.onError}
        </Container>
      );
    }

    // when map is ready, pass props to children
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const childEl = child as React.ReactElement<any>;
      return React.cloneElement(childEl, { ...this.state });
    });

    // render the map and children
    return (
      <Container
        height={this.props.height}
        width={this.props.width}
        onError={this.props.onError}
        id={this.state.containerId}
      >
        {childrenWithProps}
      </Container>
    );
  }
}
