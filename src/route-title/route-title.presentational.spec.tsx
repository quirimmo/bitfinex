import * as React from 'react';
import { RouteTitle } from './route-title.presentational';
import { shallow } from 'enzyme';

const routeTitle: string = 'my route title';
let component: any;

describe('Route Title Presentational Component', () => {
	beforeEach(() => {
		component = shallow(
			<RouteTitle title={routeTitle}>
				<div>Title</div>
			</RouteTitle>
		);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should init the title of the document', () => {
		expect(document.title).toEqual(routeTitle);
	});
});
