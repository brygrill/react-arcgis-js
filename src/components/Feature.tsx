import * as React from 'react';

import { loadFeatureLayerModule } from '../helpers';

export interface IMapPropInterface {
  add: Function;
}
export interface IFeatureProps {
  map: IMapPropInterface;
  view: object;
  url: string;
}

export interface IFeatureState {
  error: boolean;
  feature: object;
}

export class Feature extends React.Component<IFeatureProps, IFeatureState> {
  constructor(props: IFeatureProps) {
    super(props);
    this.createFeature = this.createFeature.bind(this);
    this.state = {
      error: false,
      feature: {},
    };
  }

  async createFeature() {
    try {
      const FeatureLayer = await loadFeatureLayerModule();
      const feature = new FeatureLayer({
        url: this.props.url,
      });
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
