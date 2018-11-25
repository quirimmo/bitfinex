export class Currency {
	public static buildFromRaw(rawCurrency: string[], rawCurrenciesMapping: string[][]): Currency {
		const currency = new Currency(rawCurrency[0], rawCurrency[1]);
		const item: string[] | undefined = rawCurrenciesMapping.find(onFind);
		if (Array.isArray(item)) {
			currency.fullSymbol = item[1];
		}
		return currency;

		function onFind(rawCurrencyMapping: string[]): boolean {
			return currency.isEqual(rawCurrencyMapping[0]);
		}
	}

	public fullSymbol?: string;

	constructor(public symbol: string, public name: string) {}

	public isEqual(item: string | Currency): boolean {
		return typeof item === 'string' ? this.symbol.toUpperCase() === item.toUpperCase() : this.symbol.toUpperCase() === item.symbol.toUpperCase();
	}
}
