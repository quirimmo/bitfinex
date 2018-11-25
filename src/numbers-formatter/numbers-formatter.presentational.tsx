import * as React from 'react';
import { getDefaultPropsValue, getIntegerAndDecimals, composeFormattedValue, getFormattedIntegers } from './numbers-formatter-utils';

export interface INumbersFormatterProps {
	value: number | string;
	decimalPrecision?: number;
	showNaN?: boolean;
	children?(formattedValue: string): JSX.Element;
}

export interface INumbersFormatterState {
	formattedValue: string;
}

export class NumbersFormatter extends React.Component<INumbersFormatterProps, INumbersFormatterState> {
	public static readonly DEFAULT_DECIMAL_PRECISION: number = 2;
	public static readonly DEFAULT_SHOW_NAN: boolean = true;

	constructor(props: INumbersFormatterProps) {
		super(props);
		this.state = { formattedValue: '' };
		this.formatValue = this.formatValue.bind(this);
	}

	public componentDidMount() {
		const { showNaN, decimalPrecision } = getDefaultPropsValue(
			NumbersFormatter.DEFAULT_SHOW_NAN,
			NumbersFormatter.DEFAULT_DECIMAL_PRECISION,
			this.props.showNaN,
			this.props.decimalPrecision
		);
		this.formatValue(showNaN, decimalPrecision);
	}

	public formatValue(showNaN: boolean, decimalPrecision: number): void {
		// get the number provided as value
		const numericValue = Number(this.props.value);
		// if it is not a number
		if (isNaN(numericValue)) {
			console.error('Error with the provided number:', this.props.value);
			// if showNaN true, display NaN. Otherwise keep empty
			const formattedValue: string = showNaN ? NaN.toString() : '';
			// refresh the state with the value to display
			this.setState({ formattedValue });
		} else {
			const { integerValues, decimalValues } = getIntegerAndDecimals(numericValue, decimalPrecision);
			// create an array of all the integer values in order, appending the commas
			const formattedIntegers: string[] = getFormattedIntegers(integerValues);
			// compose the final string
			const ret: string = composeFormattedValue(formattedIntegers, decimalValues);
			// refresh the state with the formatted value to display
			this.setState({ formattedValue: ret });
		}
	}

	public render() {
		return (
			<React.Fragment>
				{this.props.children && this.props.children(this.state.formattedValue)}
				{!this.props.children && this.state.formattedValue}
			</React.Fragment>
		);
	}
}
