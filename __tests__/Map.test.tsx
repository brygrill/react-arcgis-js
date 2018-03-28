import { configure, mount, shallow } from 'enzyme';
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
      <Map height="500px" width="100%" onError="Error!">
        <div>Child Component</div>
      </Map>,
      div,
    );
  });

  it('should initially display loading msg', () => {
    const tree = renderer
      .create(
        <Map height="500px" width="100%">
          <div>Child Component</div>
        </Map>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should load map on mount', async () => {
    const component = await mount(
      <Map height="500px" width="100%">
        <div>Child Component</div>
      </Map>,
    );
    // const component = shallow(
    //   <Map height="500px" width="100%">
    //     <div>Child Component</div>
    //   </Map>,
    // );
    // await component.instance().componentDidMount();
    component.update()
    // console.log(component.state('map'));
    // expect(component.state('map')).toBeTruthy();
    // expect(toJson(component)).toMatchSnapshot();
    console.log(component.state());
  });
});
