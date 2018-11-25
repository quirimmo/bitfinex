import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './app.presentational';
import { of } from 'rxjs';

let component: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
const mockStartLoading = jest.fn();
const mockStopLoading = jest.fn();
const mockFetchSymbols = jest.fn().mockReturnValue(of([]));
const mockFetchCurrencies = jest.fn().mockReturnValue(of([]));
const mockFetchTickers = jest.fn().mockReturnValue(of([]));

describe('App Presentational Component', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		component = shallow(
			<App
				fetchSymbols={mockFetchSymbols}
				fetchCurrencies={mockFetchCurrencies}
				fetchTickers={mockFetchTickers}
				startLoading={mockStartLoading}
				stopLoading={mockStopLoading}
			/>
		);
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

	describe('componentDidMount', () => {
		it('should call the startLoading prop', () => {
			expect(mockStartLoading).toHaveBeenCalled();
		});

		it('should call the stopLoading prop', () => {
			expect(mockStopLoading).toHaveBeenCalled();
		});

		it('should call the fetchSymbols prop', () => {
			expect(mockFetchSymbols).toHaveBeenCalled();
		});

		it('should call the fetchCurrencies prop', () => {
			expect(mockFetchCurrencies).toHaveBeenCalled();
		});

		it('should call the fetchTickers prop', () => {
			expect(mockFetchTickers).toHaveBeenCalled();
		});
	});
});
