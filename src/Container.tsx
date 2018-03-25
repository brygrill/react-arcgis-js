import * as React from 'react';

import { Boundary } from './Boundary';

export interface IContainerProps {
  height: string;
  width: string;
  id: string;
  onError: any;
  children?: any;
}

export const Container = (props: IContainerProps) => {
  return (
    <Boundary onError={props.onError}>
      <div style={{ height: props.height, width: props.width }}>
        <div id={props.id} style={{ height: '100%', width: '100%' }} />
        {props.children}
      </div>
    </Boundary>
  );
};
