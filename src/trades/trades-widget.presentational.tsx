import * as React from 'react';
import { Trade } from './trade.model';
import { NumbersFormatter } from './../numbers-formatter/numbers-formatter.presentational';
import * as moment from 'moment';
import './trades-widget.presentational.scss';

export interface ITradesWidgetProps {
	trades: Trade[];
}

export class TradesWidget extends React.Component<ITradesWidgetProps, any> {
	constructor(props: ITradesWidgetProps) {
		super(props);
	}

	public render() {
		return (
			<div className="bitfinex-widget trades-widget">
				<h4>Trades Widget</h4>
				<div className="row text-center">
					<div className="col-4">TIME</div>
					<div className="col-4">PRICE</div>
					<div className="col-4">AMOUNT</div>
				</div>
				<br />
				{this.props.trades.map((trade: Trade) => (
					<div className="row text-center trade-widget-item bitfinex-widget-widget-item" key={trade.id}>
						<div className="col-4">{moment(trade.time).format('HH:mm:ss')}</div>
						<div className="col-4">
							<NumbersFormatter value={trade.price} />
						</div>
						<div className="col-4">{trade.amount}</div>
					</div>
				))}
			</div>
		);
	}
}
