import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomeRouter } from './home.router';

let component: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

describe('Home Router Component', () => {
	beforeEach(() => {
		component = shallow(<HomeRouter />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});
