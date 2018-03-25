import * as React from 'react';

export interface IContainerProps {
  height: string;
  width: string;
}

export interface IContainerState {
  error: boolean;
}

export class Container extends React.Component<
  IContainerProps,
  IContainerState
> {
  public static defaultProps: Partial<IContainerProps> = {
    height: '500px',
    width: '100%'
  };

  constructor(props: IContainerProps) {
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
      return <div>Error msg here!</div>
    }
    return (
      <div style={{ height: this.props.height, width: this.props.width }}>
        {this.props.children}
      </div>
    );
  }
}
