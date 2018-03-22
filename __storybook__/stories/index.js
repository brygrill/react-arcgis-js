import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { HelloThere } from 'react-arcgis-js';

storiesOf('Button', module)
  .add('with text', () => (
    <HelloThere compiler="tsc" framework="react"/>
  ))
  // .add('with some emoji', () => (
  //   <Btn onClick={action('clicked')} label="😀 😎 👍 💯" />
  // ));
