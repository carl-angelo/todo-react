import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Topbar from "./Topbar";
import {Button, Typography} from "@material-ui/core";
import {createRender, createShallow} from "@material-ui/core/test-utils";

Enzyme.configure({ adapter: new Adapter() })

describe('Topbar Component', () => {
    let render;
    test('Renders title and button', () => {
        render = createRender();
        const component = render(<Topbar menuEvent={() => {}} searchKey={()=>{}}/>);
        expect(component.find('h6').text()).toBe('Todo App');
        expect(component.find('button').text()).toBe('Create new');

        const mockCallBack = jest.fn();
        const shallow = createShallow();
        const button = shallow(<Button onClick={mockCallBack}/>);
        button.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
