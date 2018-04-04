import * as React from 'react';

import { Boundary } from './Boundary';

export interface IContainerProps {
  height: string;
  width: string;
  hidden?: boolean;
  id: string;
  onErrorContent: any;
  children?: any;
}

export const Container = (props: IContainerProps) => {
  const { height, width, hidden, children} = props;
  return (
    <Boundary onErrorContent={props.onErrorContent}>
      <div style={{ height, width }}>
        <div
          id={props.id}
          style={{ height: '100%', width: '100%', display: hidden ? 'none' : null }}
        />
        {children}
      </div>
    </Boundary>
  );
};
