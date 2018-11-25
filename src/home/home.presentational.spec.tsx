import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Home from './home.presentational';

let component: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

describe('Home Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Home symbols={[]} />);
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
