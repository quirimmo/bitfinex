import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppLoaderContainer from './app-loader.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const isLoading: boolean = false;
const store = mockStore({ isLoading });
let component: any;

describe('App Loader Container', () => {
	beforeEach(() => {
		component = shallow(<AppLoaderContainer store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the isLoading prop', () => {
		expect(component.props().isLoading).toEqual(isLoading);
	});
});
