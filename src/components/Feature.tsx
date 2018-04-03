import * as React from 'react';

import { loadFeatureLayerModule } from '../helpers';

export interface IMapPropInterface {
  add: Function;
}

export interface IFeatureProps {
  map: IMapPropInterface;
  view: object;
  url: string;
  itemId: string;
  geojson: object;
}

export interface IFeatureState {
  error: boolean;
  featureProperties: object;
  feature: object;
}

// format the FL options based on the prop passed in
const setfeatureProperties = (props: IFeatureProps) => {
  switch (true) {
    case (!!props.geojson):
      return {};
    case (!!props.itemId):
      return {
        portalItem: {
          id: props.itemId,
        }
      };
    case (!!props.url):
      return {
        url: props.url,
      };
    default:
      return {};
  }
};

export class Feature extends React.Component<IFeatureProps, IFeatureState> {
  constructor(props: IFeatureProps) {
    super(props);
    this.createFeature = this.createFeature.bind(this);
    this.state = {
      error: false,
      featureProperties: setfeatureProperties(props),
      feature: {},
    };
  }

  async createFeature() {
    try {
      const FeatureLayer = await loadFeatureLayerModule();
      const feature = new FeatureLayer(this.state.featureProperties);
      this.props.map.add(feature);
      this.setState({ feature });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  componentDidMount() {
    this.createFeature();
  }

  render() {
    return <div />;
  }
}
