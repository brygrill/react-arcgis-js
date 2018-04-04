// Test breaking module loading functions for Map and Feature

import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Feature } from '../src/components/Feature';
import { Map } from '../src/components/Map';

import { loadFeatureLayerModule, loadMapModules } from '../src/helpers';

configure({ adapter: new Adapter() });

jest.mock('../src/helpers', () => ({
  // empty resolve will break things
  loadMapModules() {
    return Promise.resolve();
  },
  loadFeatureLayerModule() {
    return Promise.resolve();
  }
}));

const mockMap = {
  add() {}
}

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

describe('<Feature /> with Error' , () => {
  it('should set state properly when createFeature catches', async () => {
    const wrapper = shallow(
      <Feature map={mockMap} view={{}} url=""/>,
      { lifecycleExperimental: true },
    );
    await loadFeatureLayerModule();
    expect(wrapper.state(`loading`)).toBeFalsy();
    expect(wrapper.state(`error`)).toBeTruthy();
  });
});
