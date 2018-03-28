import { loadModules } from 'esri-loader';
import * as React from 'react';

import { Container } from './Container';

import { BaseMapOptions } from '../helpers';

export interface IMapProps {
  onLoading?: any; // string or component to render while loading map
  onError?: any; //  string or component to render on error
  itemId?: string; // https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html#portalItem
  baseMap?: BaseMapOptions; // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
  height: string; // height of map container in px or %
  width: string; // width of map container in px or %
  center?: Array<Number>; // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#center
  zoom?: number; // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom
  webGL?: boolean; // will load dojo config to enable WebGL Feature Layers
}

export interface IMapState {
  loading: boolean;
  error: boolean;
  containerId: string;
  modules: Array<string>;
  mapOptions: object;
  map: object;
  view: object;
  moduleOptions: object;
}

export class Map extends React.Component<IMapProps, IMapState> {
  public static defaultProps: Partial<IMapProps> = {
    onLoading: 'Loading...',
    onError: 'Error loading map...',
    baseMap: BaseMapOptions.streets_navigation_vector,
    height: '500px',
    width: '100%',
    center: [-122.41, 37.77],
    zoom: 10,
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
      moduleOptions: props.webGL
        ? {
            dojoConfig: {
              has: {
                'esri-featurelayer-webgl': 1,
              },
            },
          }
        : {},
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
    console.log('create map');
    loadModules(this.state.modules, this.state.moduleOptions)
      .then(([MapView, Map]) => {
        const map = new Map(this.state.mapOptions);
        const view = new MapView({
          map,
          container: this.state.containerId,
          center: this.props.center,
          zoom: this.props.zoom,
        });
        console.log(map);
        this.setState({ loading: false, map, view });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  componentDidMount() {
    console.log('map cDM');
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
          hidden={this.state.loading}
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
          hidden={this.state.error}
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
