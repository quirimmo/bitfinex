export class Trade {
	public static buildFromRaw(symbol: string, rawTrade: any): Trade {
		return new Trade(symbol, rawTrade[0], rawTrade[1], rawTrade[2], rawTrade[3]);
	}

	constructor(public pair: string, public id: number, public time: number, public amount: number, public price: number) {}

	public getFormattedPair(): string {
		return `${this.pair.substr(1, 3)}/${this.pair.substr(4)}`;
	}
}
