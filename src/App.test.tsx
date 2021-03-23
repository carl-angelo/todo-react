import React from 'react';
import App from './App';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from "./pages/Home";

Enzyme.configure({ adapter: new Adapter() })

describe('Todo app testing', () => {
  test('renders learn react link', () => {
    const app = shallow(<App />);
    expect(app.contains(<Home/>)).toBe(false);
  });
});

