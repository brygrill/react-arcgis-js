import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Map } from '../src/components/Map';
import { loadMapModules } from '../src/helpers';

configure({ adapter: new Adapter() });

// mock success
jest.mock('../src/helpers', () => ({
  mockConstructor(options) {
    this.options = options;
    this.url = '';
    this.on = function on(){};
    return this;
  },
  loadMapModules() {
    return Promise.resolve({
      MapView: this.mockConstructor,
      Map: this.mockConstructor,
    });
  },
}));

const mockOnError = (err) => {
  return err;
}

let spy;

describe('<Map />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Map height="500px" width="100%" onErrorContent="Error!" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
      div,
    );
  });

  it('should initially display loading msg', () => {
    const component = shallow(
      <Map height="500px" width="100%" onLoadingContent="Map Loading" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
    );
    expect(component.contains('Map Loading')).toBeTruthy();
  });

  it('should display error message when there is error', () => {
    const component = shallow(
      <Map height="500px" width="100%" onErrorContent="Error!!!" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
    );

    component.setState({ error: true, loading: false });

    // component.instance().forceUpdate()
    expect(component.contains('Error!!!')).toBeTruthy();
  });

  it('should call componentDidMount', () => {
    spy = jest.spyOn(Map.prototype, 'componentDidMount');
    const wrapper = mount(
      <Map height="500px" width="100%" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call createMap', () => {
    spy = jest.spyOn(Map.prototype, 'createMap');
    const wrapper = mount(
      <Map height="500px" width="100%" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set state properly when createMap returns successfully', async () => {
    const wrapper = shallow(
      <Map height="500px" width="100%" onError={mockOnError}>
        <div>Child Component</div>
      </Map>,
      { lifecycleExperimental: true },
    );
    await loadMapModules(['one', 'two'], {});
    expect(wrapper.state(`loading`)).toBeFalsy();
    expect(wrapper.state(`error`)).toBeFalsy();
    expect(wrapper.state(`view`)).toHaveProperty('url');
  });
});

afterEach(() => {
  if (spy) spy.mockClear();
  jest.clearAllMocks();
});
