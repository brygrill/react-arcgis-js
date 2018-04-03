import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Map } from '../src/components/Map';
import { loadMapModules } from '../src/helpers';

configure({ adapter: new Adapter() });

// TODO: figure out how to simulate catch in Map.test.tsx
jest.mock('../src/helpers', () => ({
  loadMapModules() {
    return Promise.resolve();
  },
}));

describe('<Map /> with Error' , () => {
  it('should set state properly when createMap catches', async () => {
    const wrapper = shallow(
      <Map height="500px" width="100%">
        <div>Child Component</div>
      </Map>,
      { lifecycleExperimental: true },
    );
    await loadMapModules([], {});
    expect(wrapper.state(`loading`)).toBeFalsy();
    expect(wrapper.state(`error`)).toBeTruthy();
  });
});
