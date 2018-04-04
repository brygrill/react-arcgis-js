import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Feature } from '../src/components/Feature';
import { loadFeatureLayerModule } from '../src/helpers';

configure({ adapter: new Adapter() });

jest.mock('../src/helpers', () => ({
  mockConstructor(options) {
    this.options = options;
    this.url = '';
    return this;
  },
  loadFeatureLayerModule() {
    return new Promise((resolve, reject) => {
      const FeatureLayer = this.mockConstructor;
      resolve(FeatureLayer);
    });
  },
}));

const mockMap = {
  add() {},
};

let spy;

describe('<Feature />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Feature map={mockMap} view={{}} url=""/>, div);
  });

  it('should call componentDidMount', () => {
    spy = jest.spyOn(Feature.prototype, 'componentDidMount');
    const wrapper = mount(
      <Feature map={mockMap} view={{}} url=""/>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call createFeature', () => {
    spy = jest.spyOn(Feature.prototype, 'createFeature');
    const wrapper = mount(
      <Feature map={mockMap} view={{}} url=""/>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set state properly when createFeature returns successfully', async () => {
    const wrapper = shallow(<Feature map={mockMap} view={{}} url="" />, {
      lifecycleExperimental: true,
    });
    await loadFeatureLayerModule();
    expect(wrapper.state(`loading`)).toBeFalsy();
    expect(wrapper.state(`error`)).toBeFalsy();
    expect(wrapper.state(`feature`)).toHaveProperty('url');
  });
});
