import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import HomeContainer from './home.container';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
let component: any;

describe('Home Container Component', () => {
	beforeEach(() => {
		component = shallow(<HomeContainer store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});
});
