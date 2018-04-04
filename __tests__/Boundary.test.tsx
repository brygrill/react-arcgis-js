import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Boundary } from '../src/components/Boundary';

configure({ adapter: new Adapter() });

const mockOnError = (err) => {
  return err;
}

describe('<Boundary />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Boundary onErrorContent="Error!" onError={mockOnError}>
        <div>Map</div>
      </Boundary>,
      div,
    );
  });

  it('should display children without error', () => {
    const tree = renderer
      .create(
        <Boundary onErrorContent="Error!" onError={mockOnError}>
          <div>Map</div>
        </Boundary>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display error message when there is error', () => {
    const component = shallow(
      <Boundary onErrorContent="Error!" onError={mockOnError}>
        <div>App</div>
      </Boundary>,
    );
    component.setState({
      error: true,
    });

    expect(toJson(component)).toMatchSnapshot();
  });
});
