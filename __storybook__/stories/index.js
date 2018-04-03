import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Map, Feature } from '../../dist';

const FLChild = props => {
  if (!props.loading) {
    props.feature.on("click", function(event){
      // event is the event handle returned after the event fires.
      console.log(event.mapPoint);
    });
  };
  return <div />;
};
storiesOf('Map', module)
  .add('With no props', () => <Map />)
  .add('With itemId prop', () => (
    <Map itemId="aea0b8bf28884a27bfb5523b3d6d6aeb" />
  ));

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
  ))
  .add('With child element', () => (
    <Map webGL>
      <Feature itemId="8444e275037549c1acab02d2626daaee">
        <FLChild />
      </Feature>
    </Map>
  ));
