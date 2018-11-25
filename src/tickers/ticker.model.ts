export class Ticker {
	public static buildFromRawTicker(rawTicker: any): Ticker {
		const ticker: Ticker = new Ticker(rawTicker[0]);
		if (ticker.isT()) {
			ticker.bid = rawTicker[1];
			ticker.bidSize = rawTicker[2];
			ticker.ask = rawTicker[3];
			ticker.askSize = rawTicker[4];
			ticker.dailyChange = rawTicker[5];
			ticker.dailyChangePerc = rawTicker[6];
			ticker.lastPrice = rawTicker[7];
			ticker.volume = rawTicker[8];
			ticker.high = rawTicker[9];
			ticker.low = rawTicker[10];
		} else {
			ticker.frr = rawTicker[1];
			ticker.bid = rawTicker[2];
			ticker.bidPeriod = rawTicker[3];
			ticker.bidSize = rawTicker[4];
			ticker.ask = rawTicker[5];
			ticker.askPeriod = rawTicker[6];
			ticker.askSize = rawTicker[7];
			ticker.dailyChange = rawTicker[8];
			ticker.dailyChangePerc = rawTicker[9];
			ticker.lastPrice = rawTicker[10];
			ticker.volume = rawTicker[11];
			ticker.high = rawTicker[12];
			ticker.low = rawTicker[13];
		}
		return ticker;
	}

	public frr?: number;
	public bid?: number;
	public bidSize?: number;
	public bidPeriod?: number;
	public ask?: number;
	public askSize?: number;
	public askPeriod?: number;
	public dailyChange?: number;
	public dailyChangePerc?: number;
	public lastPrice: number = NaN;
	public volume: number = NaN;
	public high?: number;
	public low?: number;

	constructor(public symbol: string) {}

	public getFirstCurrency(): string {
		return this.symbol.substr(1, 3);
	}

	public getSecondCurrency(): string {
		return this.symbol.substr(4);
	}

	public isT(): boolean {
		return this.symbol.charAt(0).toUpperCase() === 'T';
	}
}
