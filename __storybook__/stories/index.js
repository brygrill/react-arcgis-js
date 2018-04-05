import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { Map, Feature } from '../../dist';

const resp = resp => {
  console.log(resp);
};

storiesOf('Map', module)

  .add(
    'Props',
    withInfo(`
  description or documentation about my component, supports markdown

  ~~~js
  <Button>Click Here</Button>
  ~~~

  `)(() => <Map />),
  )
  .add('Example - with itemId prop', () => (
    <Map itemId="aea0b8bf28884a27bfb5523b3d6d6aeb" />
  ))
  .add('With itemId prop', () => (
    <Map itemId="aea0b8bf28884a27bfb5523b3d6d6aeb" />
  ))
  .add('With onMapClick prop', () => <Map onMapClick={resp} />);

storiesOf('Map with Feature Layer', module)
  .add('With url prop', () => (
    <Map webGL>
      <Feature url="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3" />
    </Map>
  ))
  .add('With itemId prop', () => (
    <Map webGL>
      <Feature itemId="8444e275037549c1acab02d2626daaee" />
    </Map>
  ));
