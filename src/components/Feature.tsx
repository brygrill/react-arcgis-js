import * as React from 'react';

import { loadFeatureLayerModule } from '../helpers';

export interface IFeatureProps {
  map: object;
  view: object;
}

export interface IFeatureState {
  feature: object;
}

export class Feature extends React.Component<IFeatureProps, IFeatureState> {

  constructor(props: IFeatureProps) {
    super(props);
    this.state = {
      feature: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return <div/>
  }
}