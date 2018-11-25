import * as React from 'react';
import AppNavigation from './app-navigation.presentational';
import { shallow } from 'enzyme';

let component: any;

describe('App Navigation Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<AppNavigation />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should set the isMenuOpen to false', () => {
		expect(component.state().isMenuOpen).toBeFalsy();
	});
});
