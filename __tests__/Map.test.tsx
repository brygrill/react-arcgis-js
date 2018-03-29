import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Map } from '../src/components/Map';

configure({ adapter: new Adapter() });

let spy;

describe('<Map />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Map height="500px" width="100%" onError="Error!">
        <div>Child Component</div>
      </Map>,
      div,
    );
  });

  it('should initially display loading msg', () => {
    const component = shallow(
      <Map height="500px" width="100%" onLoading="Map Loading">
        <div>Child Component</div>
      </Map>,
    );
    expect(component.contains('Map Loading')).toBeTruthy();
  });

  it('should display error message when there is error', () => {
    const component = shallow(
      <Map height="500px" width="100%" onError="Error!!!">
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
      <Map height="500px" width="100%">
        <div>Child Component</div>
      </Map>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: test createMap function
  // mock success and check state
  // mock fail and check state
});

afterEach(() => {
  if (spy) spy.mockClear();
});