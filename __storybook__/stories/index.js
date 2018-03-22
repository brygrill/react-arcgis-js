import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Btn from 'react-arcgis-js';

storiesOf('Button', module)
  .add('with text', () => (
    <Btn onClick={action('clicked')} label="Hello Button" />
  ))
  .add('with some emoji', () => (
    <Btn onClick={action('clicked')} label="😀 😎 👍 💯" />
  ));
