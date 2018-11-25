import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppLoader } from './app-loader.presentational';

let component: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

describe('App Loader Presentational Component', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		component = shallow(<AppLoader isLoading={false} />);
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
