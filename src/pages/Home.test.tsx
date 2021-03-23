import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from "./Home";
import {DragDropContext} from 'react-beautiful-dnd';

Enzyme.configure({ adapter: new Adapter() })

describe('Home Component', () => {
    test('Renders three statuses division', () => {
        const home = shallow(<Home/>);
        expect(home.contains(<DragDropContext/>)).toBe(false);
    });
});
