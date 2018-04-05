import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ReactMarkdown from 'react-markdown';
import { Map, Feature } from '../../dist';

const resp = resp => {
  console.log(resp);
};

const content =
`
\`\`\`jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'react-arcgis-js';

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);
\`\`\`
`

storiesOf('Map', module)
  .add('Props', () => (
    <ReactMarkdown source={content} />
  ))
  .add('Example - with no props', () => (
    <Map />
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
