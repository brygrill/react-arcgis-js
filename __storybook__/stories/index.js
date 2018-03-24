import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Map } from 'react-arcgis-js';

const Child = props => {
  console.log(props);
  return (
    <div>
      MyChild
    </div>
  );
};

storiesOf('Map', module)
  .add('with no item id', () => (
    <Map><Child/></Map>
  ))
  .add('with item id', () => <Map itemId="aea0b8bf28884a27bfb5523b3d6d6aeb" />);
