import * as React from 'react';

export interface IBoundaryProps {
  onErrorContent?: any; // string or component to render on error
  onError?(error: any): void; // function that will get called on error and return the error as { error: ..., info: ...}
}

export interface IBoundaryState {
  error: boolean;
}

export class Boundary extends React.Component<IBoundaryProps, IBoundaryState> {
  public static defaultProps: Partial<IBoundaryProps> = {
    onErrorContent: 'Error loading map...',
    onError: () => {},
  };

  constructor(props: IBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const { onError } = this.props;
    onError!({ error, info });
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <div>{this.props.onErrorContent}</div>;
    }
    return <div>{this.props.children}</div>;
  }
}
