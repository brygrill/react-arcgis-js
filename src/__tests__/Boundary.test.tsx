import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import {Boundary} from '../components/Boundary';

configure({ adapter: new Adapter() });

describe('<Boundary />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Boundary onError='Error!'>
        <div>Map</div>
      </Boundary>,
      div,
    );
  });

  it('should display children without error', () => {
    const tree = renderer
      .create(
        <Boundary onError='Error!'>
          <div>Map</div>
        </Boundary>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display error message when there is error', () => {
    const component = shallow(
      <Boundary onError='Error!'>
        <div>App</div>
      </Boundary>,
    );
    component.setState({
      error: true,
    });

    expect(toJson(component)).toMatchSnapshot();
  });
});