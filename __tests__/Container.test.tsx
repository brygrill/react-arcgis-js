import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Container } from '../src/components/Container';

configure({ adapter: new Adapter() });

const mockOnError = (err) => {
  return err;
}

describe('<Container />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Container
        height="500px"
        width="100%"
        id="container-test"
        onErrorContent="Error!"
        onError={mockOnError}
      >
        <div>Map</div>
      </Container>,
      div,
    );
  });

  it('should display children without error', () => {
    const tree = renderer
      .create(
        <Container
          height="500px"
          width="100%"
          id="container-test"
          onErrorContent="Error!"
          onError={mockOnError}
        >
          <div>Map</div>
        </Container>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
