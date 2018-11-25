import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AppRoutes from './app.routes';

let component: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

describe('App Routes Component', () => {
	beforeEach(() => {
		component = shallow(<AppRoutes />);
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
