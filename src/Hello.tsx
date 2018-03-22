import * as React from 'react';

export interface IHelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: IHelloProps) => {
  return (
    <div>
      Hello from {props.compiler} and {props.framework}!
    </div>
  );
};
