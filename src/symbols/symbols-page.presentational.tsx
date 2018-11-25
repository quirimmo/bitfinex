import * as React from 'react';
import { Container, Button } from 'reactstrap';
import { RouteTitle } from './../route-title/route-title.presentational';
import { Ticker } from './../tickers/ticker.model';
import { TickersWidget } from './../tickers/tickers-widget.presentational';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { ITradesAction } from './../trades/trades.actions';
import { Trade } from './../trades/trade.model';
import { TradesWidget } from './../trades/trades-widget.presentational';
import { WebSocketProxy } from './../services/web-socket-proxy.service';
import { Book } from './../books/book.model';
import { IBooksAction } from './../books/books.actions';
import { BooksWidget } from './../books/books-widget.presentational';

export interface ISymbolsPageProps {
	currentSymbol: string;
	tickers: Ticker[];
	trades: Trade[];
	books: Book[];
	fetchTrades: (symbol: string) => Observable<ITradesAction>;
	fetchBooks: (symbol: string) => Observable<IBooksAction>;
	addTrade: (trade: Trade) => any;
	updateTrade: (trade: Trade) => any;
	addBook: (book: Book) => any;
	updateBook: (book: Book) => any;
}

export interface ISymbolPageState {
	isSocketConnected: boolean;
}

export class SymbolsPage extends React.Component<ISymbolsPageProps, ISymbolPageState> {
	public booksChannelSubscription?: Subscription;
	public tradesChannelSubscription?: Subscription;

	constructor(props: ISymbolsPageProps) {
		super(props);
		this.state = {
			isSocketConnected: false
		};
		this.connectToWS = this.connectToWS.bind(this);
		this.disconnectFromWS = this.disconnectFromWS.bind(this);
	}

	public componentDidMount() {
		const subscription: Subscription = forkJoin(
			this.props.fetchTrades(`t${this.props.currentSymbol}`),
			this.props.fetchBooks(`t${this.props.currentSymbol}`)
		).subscribe(() => {}, () => {}, onFinally);

		function onFinally() {
			if (subscription) {
				subscription.unsubscribe();
			}
		}
	}

	public render() {
		return (
			<Container fluid={true}>
				<RouteTitle title={`t${this.props.currentSymbol}`}>
					<h3>{`t${this.props.currentSymbol}`}</h3>
				</RouteTitle>
				<br />
				<div className="container mb-5">
					<Button disabled={this.state.isSocketConnected} onClick={this.connectToWS} className="mr-1">
						Enable WS
					</Button>
					<Button disabled={!this.state.isSocketConnected} onClick={this.disconnectFromWS}>
						Disable WS
					</Button>
				</div>
				<br />
				<TickersWidget tickers={this.props.tickers.filter((ticker: Ticker) => ticker.symbol.charAt(0).toUpperCase() === 'T')} />
				<br />
				<TradesWidget trades={this.props.trades} />
				<br />
				<BooksWidget books={this.props.books} />
			</Container>
		);
	}

	public connectToWS(): void {
		const that: SymbolsPage = this;
		WebSocketProxy.connect().subscribe(onSubscribe);

		function onSubscribe(resp: any) {
			that.setState({
				isSocketConnected: true
			});
			that.tradesChannelSubscription = WebSocketProxy.subscribeToTradesChannel(`t${that.props.currentSymbol}`).subscribe((data: any) => {
				const newTrades: Trade[] = data.map((el: any) => new Trade(`t${that.props.currentSymbol}`, el[0], el[1], el[2], el[3]));
				newTrades.forEach((trade: Trade) => {
					if (!that.props.trades.find((t: Trade) => t.id === trade.id)) {
						that.props.addTrade(trade);
					} else {
						that.props.updateTrade(trade);
					}
				});
			});

			that.booksChannelSubscription = WebSocketProxy.subscribeToBooksChannel(`t${that.props.currentSymbol}`).subscribe((data: any) => {
				const book: Book = new Book(`t${that.props.currentSymbol}`, data[0], data[1], data[2]);
				// just printing the books
				console.log('received book:', book);
			});
		}
	}

	public componentWillUnmount() {
		this.disconnectFromWS();
		if (this.booksChannelSubscription) {
			this.booksChannelSubscription.unsubscribe();
		}
		if (this.tradesChannelSubscription) {
			this.tradesChannelSubscription.unsubscribe();
		}
	}

	public disconnectFromWS(): void {
		WebSocketProxy.disconnect().subscribe(() =>
			this.setState({
				isSocketConnected: false
			})
		);
	}
}
