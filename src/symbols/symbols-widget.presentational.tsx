import * as React from 'react';
import { SymbolModel } from './symbol.model';
import { NavLink } from 'react-router-dom';

export interface ISymbolsWidgetProps {
	symbols: SymbolModel[];
}

export interface ITickersWidgetState {
	symbols: SymbolModel[];
}

export class SymbolsWidget extends React.Component<ISymbolsWidgetProps, ITickersWidgetState> {
	constructor(props: ISymbolsWidgetProps) {
		super(props);
		this.state = {
			symbols: this.props.symbols
		};
	}

	public componentWillReceiveProps(nextProps: ISymbolsWidgetProps) {
		if (nextProps.symbols.length) {
			this.setState((prevState: ISymbolsWidgetProps) => ({
				symbols: nextProps.symbols
			}));
		}
	}

	public render() {
		return (
			<div className="symbols-widget container-fluid">
				<div className="row">
					{this.state.symbols.map((symbol: SymbolModel) => (
						<div className="col-6 col-sm-4 col-md-3 col-lg-2" key={symbol.pair}>
							<NavLink to={`/symbol/${symbol.pair}`}>{symbol.pair}</NavLink>
						</div>
					))}
				</div>
			</div>
		);
	}
}
