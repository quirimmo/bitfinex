import * as React from 'react';
import { shallow } from 'enzyme';

const mockGetDefaultPropsValue: any = jest.fn().mockReturnValue({ showNaN: true, decimalPrecision: 2 });
const mockGetIntegerAndDecimals: any = jest.fn().mockReturnValue({ integerValues: '4324321121', decimalValues: '433' });
const mockComposeFormattedValue: any = jest.fn().mockReturnValue('4,324,321,121.43');
const mockGetFormattedIntegers: any = jest.fn().mockReturnValue(['4', ',', '324', '321', '121']);
jest.mock('./numbers-formatter-utils', () => ({
	getDefaultPropsValue: mockGetDefaultPropsValue,
	getIntegerAndDecimals: mockGetIntegerAndDecimals,
	composeFormattedValue: mockComposeFormattedValue,
	getFormattedIntegers: mockGetFormattedIntegers
}));

import { NumbersFormatter } from './numbers-formatter.presentational';

let component: any;
let instance: any;
let spyFormatValue: any = jest.fn();

describe('NumbersFormatter Presentational Component', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		spyFormatValue = jest.spyOn(NumbersFormatter.prototype, 'formatValue');
		component = shallow(
			<NumbersFormatter value={4324321121.433}>{(formattedValue: string) => <div>I am the formatted value: {formattedValue}</div>}</NumbersFormatter>
		);
		instance = component.instance();
	});
	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the instance methods', () => {
		expect(typeof instance.formatValue).toEqual('function');
	});

	it('should define the state formattedValue prop', () => {
		expect(component.state().formattedValue).toBeDefined();
	});

	it('should display the final text', () => {
		expect(component.text()).toEqual('I am the formatted value: 4,324,321,121.43');
	});

	describe('componentDidMount', () => {
		it('should call the getDefaultPropsValue function', () => {
			expect(mockGetDefaultPropsValue).toHaveBeenCalledWith(true, 2, undefined, undefined);
		});

		it('should call the formatValue method', () => {
			expect(spyFormatValue).toHaveBeenCalledWith(true, 2);
		});
	});

	describe('formatValue', () => {
		describe('not numberic value prop', () => {
			let spy: jest.SpyInstance;
			beforeEach(() => {
				spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			});
			afterEach(() => {
				spy.mockRestore();
			});

			it('should log the error if the value is not a valid number', () => {
				component.setProps({ value: 'test' });
				instance.componentDidMount();
				expect(spy).toHaveBeenCalledWith('Error with the provided number:', 'test');
			});

			it('should set the formattedValue in the state showing NaN', () => {
				component.setProps({ value: 'test', showNaN: true });
				const spySetState: any = jest.spyOn(instance, 'setState');
				instance.componentDidMount();
				expect(spySetState).toHaveBeenCalledWith({ formattedValue: 'NaN' });
			});

			it('should set the formattedValue in the state without showing NaN', () => {
				component.setProps({ value: 'test', showNaN: false });
				mockGetDefaultPropsValue.mockReturnValue(() => ({ showNaN: false, decimalPrecision: 2 }));
				const spySetState: any = jest.spyOn(instance, 'setState');
				instance.componentDidMount();
				expect(spySetState).toHaveBeenCalledWith({ formattedValue: '' });
			});
		});

		describe('numberic value prop', () => {
			it('should call the getIntegerAndDecimals function', () => {
				instance.formatValue();
				expect(mockGetIntegerAndDecimals).toHaveBeenCalled();
			});

			it('should call the getFormattedIntegers function', () => {
				instance.formatValue();
				expect(mockGetFormattedIntegers).toHaveBeenCalled();
			});

			it('should call the composeFormattedValue function', () => {
				instance.formatValue();
				expect(mockComposeFormattedValue).toHaveBeenCalled();
			});
		});
	});
});
