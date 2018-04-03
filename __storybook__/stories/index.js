import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Map, Feature } from '../../dist';

storiesOf('Map', module)
  .add('with item id', () => <Map itemId="aea0b8bf28884a27bfb5523b3d6d6aeb" />)
  .add('with no item id', () => (
    <Map webGL/>
  ))
  .add('with feature layer url', () => (
    <Map webGL>
      <Feature url="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3"/>
    </Map>
  ));
