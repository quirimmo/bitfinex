export interface IRawSymbol {
	pair: string;
	price_precision: number;
	initial_margin: string;
	minimum_margin: string;
	maximum_order_size: string;
	minimum_order_size: string;
	expiration: string;
	margin: boolean;
}

export class SymbolModel {
	public static buildFromRawSymbol(rawSymbol: IRawSymbol): SymbolModel {
		const symbol: SymbolModel = new SymbolModel(
			rawSymbol.pair.toUpperCase(),
			rawSymbol.price_precision,
			rawSymbol.initial_margin,
			rawSymbol.minimum_margin,
			rawSymbol.maximum_order_size,
			rawSymbol.minimum_order_size,
			rawSymbol.expiration,
			rawSymbol.margin
		);
		return symbol;
	}

	constructor(
		public pair: string,
		public pricePrecision: number,
		public initialMargin: string,
		public minimumMargin: string,
		public maximumOrderSize: string,
		public minimumOrderSize: string,
		public expiration: string,
		public margin: boolean
	) {}

	public getFormattedPair(): string {
		return `${this.pair.substr(0, 3)}/${this.pair.substr(3, 3)}`;
	}

	public isEqual(item: string | SymbolModel): boolean {
		return typeof item === 'string' ? this.pair.toUpperCase() === item.toUpperCase() : this.pair.toUpperCase() === item.pair.toUpperCase();
	}
}
