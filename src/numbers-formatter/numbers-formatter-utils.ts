export const getDefaultPropsValue = (
	defaultShowNaN: boolean,
	defaultDecimalPrecision: number,
	showNaN?: boolean,
	decimalPrecision?: number
): { showNaN: boolean; decimalPrecision: number } => {
	// get the showNaN value if provided, otherwise set default to true
	const showNaNValue: boolean = typeof showNaN === 'undefined' ? defaultShowNaN : Boolean(showNaN);
	// get the privded decimal precision or a default one
	const decimalPrecisionValue: number = decimalPrecision || defaultDecimalPrecision;
	return { showNaN: showNaNValue, decimalPrecision: decimalPrecisionValue };
};

export const getIntegerAndDecimals = (numericValue: number, decimalPrecision: number): { integerValues: string; decimalValues: string } => {
	// convert the number to a string, fixing the decimal precision
	const stringValue: string = numericValue.toFixed(decimalPrecision);
	// get the integer part of the number
	const integerValues: string = stringValue.split('.')[0];
	// get the decimal part of the number if any, otherwise an empty string
	const decimalValues: string = stringValue.split('.')[1] || '';
	return { integerValues, decimalValues };
};

export const composeFormattedValue = (formattedIntegers: string[], decimalValues: string): string => {
	// get back a string from the array of integers
	let ret = formattedIntegers.join('');
	// if there are decimal values, suffix them at the end after a dot
	if (decimalValues.length) {
		ret += `.${decimalValues}`;
	}
	return ret;
};

export const getFormattedIntegers = (integerValues: string): string[] => {
	// reduce the array from right to left, appending commas, and return the built array
	return integerValues.split('').reduceRight(onReduceRight, []);

	function onReduceRight(accumulator: string[], currentValue: string, index: number) {
		// use the idea of a queue to enqueue the element always at the top of the array,
		// for keeeping the numeric value of the starting number
		accumulator.unshift(currentValue);
		// enque the comma when thousand is reached and the number is not finished (e.g. avoid ,100,000)
		if (countNumbersExceptCommas(accumulator) % 3 === 0 && index > 0) {
			accumulator.unshift(',');
		}
		return accumulator;
	}

	function countNumbersExceptCommas(input: string[]): number {
		return input.filter((el: string) => el !== ',').length;
	}
};
