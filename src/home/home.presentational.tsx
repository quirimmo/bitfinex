import * as React from 'react';
import { Container } from 'reactstrap';
import { RouteTitle } from './../route-title/route-title.presentational';
import { WebSocketProxy } from './../services/web-socket-proxy.service';
import { SymbolModel } from 'symbols/symbol.model';
import { SymbolsWidget } from './../symbols/symbols-widget.presentational';

export interface IHomeProps {
	symbols: SymbolModel[];
}

/**
 * Home Presentational component which is rendered by the Home Route Component when displaying the Home Route
 * @class Home
 * @extends {React.Component<IHomeProps, any>}
 */
class Home extends React.Component<IHomeProps, any> {
	constructor(props: IHomeProps) {
		super(props);
		this.connectToWS = this.connectToWS.bind(this);
		this.disconnectFromWS = this.disconnectFromWS.bind(this);
	}

	public render() {
		return (
			<Container fluid={true}>
				<RouteTitle title="Symbols List">
					<h3>Symbols List</h3>
				</RouteTitle>
				<br />
				<SymbolsWidget symbols={this.props.symbols} />
			</Container>
		);
	}

	public connectToWS(): void {
		WebSocketProxy.connect().subscribe();
	}

	public disconnectFromWS(): void {
		WebSocketProxy.disconnect().subscribe();
	}

	// <br />
	// 			<NumbersFormatter value={1121.43342423} decimalPrecision={15} />
	// 			<br />
	// 			<NumbersFormatter value={'1121.43342423'} decimalPrecision={5} />
	// 			<br />
	// 			<NumbersFormatter value={4324321121.433}>{(text: string) => <div>$ {text} USD</div>}</NumbersFormatter>
	// 			<br />
	// 			<NumbersFormatter value={'4324321121.433'} />
	// 			<br />
	// 			<NumbersFormatter value={'weqdsakdjsa.433'} />
	// 			<br />
	// 			<NumbersFormatter value={'eiwoiwqeouqoi.433'}>{(text: string) => <span>CHOPPER {text}</span>}</NumbersFormatter>
	// 			<br />

	// 	<RouteTitle title="HOME PAGE">
	// 	<h1>Home</h1>
	// </RouteTitle>
	// 	<Button color="primary" onClick={this.startLoading}>
	// 	START LOADING
	// </Button>
	// <AlertMessage isVisible={true} type="danger">
	// 	Yes Sir
	// </AlertMessage>
}

export default Home;
