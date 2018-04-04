import * as React from 'react';

export interface IBoundaryProps {
  onErrorContent: any;
}

export interface IBoundaryState {
  error: boolean;
}

export class Boundary extends React.Component<IBoundaryProps, IBoundaryState> {
  public static defaultProps: Partial<IBoundaryProps> = {
    onErrorContent: 'Error loading map...',
  };

  constructor(props: IBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <div>{this.props.onErrorContent}</div>;
    }
    return <div>{this.props.children}</div>;
  }
}
