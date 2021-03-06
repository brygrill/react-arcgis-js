import * as React from 'react';

import { IBoundaryProps } from './Boundary';
import { Container } from './Container';

import { IEventInterface, IViewProperties, loadMapModules } from '../helpers';

export interface IMapProps extends IBoundaryProps {
  onLoadingContent?: any; // string or component to render while loading map
  itemId?: string; // https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html#portalItem
  baseMap?: string; // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
  height?: string; // height of map container in px or %
  width?: string; // width of map container in px or %
  center?: Array<Number>; // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#center
  zoom?: number; // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom
  webGL?: boolean; // will load dojo config to enable WebGL Feature Layers
  onMapClick?(event: any): void; // will return object on map click
  constraints?: object; // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constraints
}

export interface IMapState {
  loading: boolean;
  error: boolean;
  containerId: string;
  modules: Array<string>;
  mapOptions: object;
  map: object;
  view: IViewProperties;
  moduleOptions: object;
}

export class Map extends React.Component<IMapProps, IMapState> {
  public static defaultProps: Partial<IMapProps> = {
    onLoadingContent: 'Loading...',
    baseMap: 'streets-navigation-vector',
    height: '500px',
    width: '100%',
    center: [-122.41, 37.77],
    zoom: 10,
    webGL: false,
    onMapClick: () => {},
  };

  constructor(props: IMapProps) {
    super(props);
    this.createMap = this.createMap.bind(this);
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
                'esri-promise-compatibility-deprecation-warnings': 0,
              },
            },
          }
        : {
            dojoConfig: {
              has: {
                'esri-promise-compatibility-deprecation-warnings': 0,
              },
            },
          },
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
      view: {
        on() {},
        hitTest() {},
      },
    };
  }

  async createMap() {
    const { onError } = this.props;
    try {
      // load modules
      const { Map, MapView } = await loadMapModules(
        this.state.modules,
        this.state.moduleOptions,
      );
      // init map
      const map = new Map(this.state.mapOptions);
      const view = new MapView({
        map,
        container: this.state.containerId,
        center: this.props.center,
        zoom: this.props.zoom,
        ...(this.props.constraints && {constraints: this.props.constraints})
      });
      // init listener
      this.initViewClickListener(view);
      // set state
      this.setState({ loading: false, map, view });
    } catch (error) {
      onError!({ error, info: null });
      this.setState({ loading: false, error: true });
    }
  }

  initViewClickListener = (view: IViewProperties) => {
    const { onMapClick } = this.props;
    view.on('click', (event: IEventInterface) => {
      const screenPoint = {
        x: event.x,
        y: event.y,
      };

      view.hitTest(screenPoint).then((response: object) => {
        onMapClick!(response);
      });
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
          height={this.props.height as string}
          width={this.props.width as string}
          onErrorContent={this.props.onErrorContent}
          onError={this.props.onError}
          id={this.state.containerId}
          hidden={this.state.loading}
        >
          {this.props.onLoadingContent}
        </Container>
      );
    }

    // if error render error msg
    if (this.state.error) {
      return (
        <Container
          height={this.props.height as string}
          width={this.props.width as string}
          onErrorContent={this.props.onErrorContent}
          onError={this.props.onError}
          id={this.state.containerId}
          hidden={this.state.error}
        >
          {this.props.onErrorContent}
        </Container>
      );
    }

    // when map is ready, pass props to children
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const childEl = child as React.ReactElement<any>;
      return React.cloneElement(childEl, {
        loading: this.state.loading,
        error: this.state.error,
        map: this.state.map,
        view: this.state.view,
      });
    });

    // render the map and children
    return (
      <Container
        height={this.props.height as string}
        width={this.props.width as string}
        onErrorContent={this.props.onErrorContent}
        onError={this.props.onError}
        id={this.state.containerId}
      >
        {childrenWithProps}
      </Container>
    );
  }
}
