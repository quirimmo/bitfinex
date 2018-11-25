import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { WrapperLoader } from './wrapper-loader.presentational';

let wrapperLoader: ShallowWrapper<any, Readonly<{}>, React.Component<any, any, any>>;

describe('Wrapper Loader Presentational', () => {
	beforeEach(() => {
		wrapperLoader = shallow(
			<WrapperLoader position="absolute" isLoading={false}>
				<div>TEST</div>
			</WrapperLoader>
		);
	});

	it('should be defined', () => {
		expect(wrapperLoader).toBeDefined();
	});

	it('should match the snapshot if loading is false', () => {
		expect(wrapperLoader).toMatchSnapshot();
	});

	it('should match the snapshot if loading is true', () => {
		wrapperLoader.setProps({ isLoading: true });
		expect(wrapperLoader).toMatchSnapshot();
	});
});
