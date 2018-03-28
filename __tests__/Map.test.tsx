import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Map } from '../src/components/Map';

configure({ adapter: new Adapter() });

describe('<Map />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Map
        height="500px"
        width="100%"
        onError="Error!"
      >
        <div>Child Component</div>
      </Map>,
      div,
    );
  });
});
