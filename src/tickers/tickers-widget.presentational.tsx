import * as React from 'react';
import { Ticker } from './ticker.model';
import './tickers-widget.presentational.scss';
import { NumbersFormatter } from './../numbers-formatter/numbers-formatter.presentational';
import { Input } from 'reactstrap';

export interface ITickersWidgetProps {
	tickers: Ticker[];
}

export class TickersWidget extends React.Component<ITickersWidgetProps, any> {
	constructor(props: ITickersWidgetProps) {
		super(props);
		this.state = {
			tickerNameFilter: ''
		};

		this.onChangeFilter = this.onChangeFilter.bind(this);
	}

	public onChangeFilter(event: any): void {
		const filterName: string = event.target.value.trim().toUpperCase();
		this.setState({
			tickerNameFilter: filterName
		});
	}

	public render() {
		return (
			<div className="bitfinex-widget tickers-widget">
				<h4>Tickers Widget</h4>
				<div className="row wrapper-filter-tickers">
					<Input placeholder="Search ticker..." onChange={this.onChangeFilter} />
				</div>
				<div className="row text-center">
					<div className="col-2">NAME</div>
					<div className="col-4">LAST</div>
					<div className="col-2">24HR</div>
					<div className="col-4">VOL {this.props.tickers[0] && this.props.tickers[0].getFirstCurrency()}</div>
				</div>
				<br />
				{this.props.tickers
					.filter((ticker: Ticker) => ticker.getFirstCurrency().includes(this.state.tickerNameFilter))
					.map((ticker: Ticker) => (
						<div className="row text-center ticker-widget-item bitfinex-widget-widget-item" key={ticker.symbol}>
							<div className="col-2">{ticker.getFirstCurrency()}</div>
							<div className="col-4">
								<NumbersFormatter value={ticker.lastPrice}>
									{(formattedValue: string) => (
										<React.Fragment>
											<span>{formattedValue}</span>
											<span>{ticker.getSecondCurrency()}</span>
										</React.Fragment>
									)}
								</NumbersFormatter>
							</div>
							<div className="col-2">{ticker.dailyChangePerc}%</div>
							<div className="col-4">
								<NumbersFormatter value={ticker.volume} />
							</div>
						</div>
					))}
			</div>
		);
	}
}
