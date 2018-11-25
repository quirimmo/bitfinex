export class Book {
	public static buildFromRaw(symbol: string, rawTrade: any): Book {
		return new Book(symbol, rawTrade[0], rawTrade[1], rawTrade[2]);
	}

	constructor(public symbol: string, public price: number, public count: number, public amount: number) {}
}
