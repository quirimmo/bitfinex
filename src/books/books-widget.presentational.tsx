import * as React from 'react';
import { Book } from './book.model';
import { NumbersFormatter } from './../numbers-formatter/numbers-formatter.presentational';

export interface IBooksWidgetProps {
	books: Book[];
}

export class BooksWidget extends React.Component<IBooksWidgetProps, any> {
	constructor(props: IBooksWidgetProps) {
		super(props);
	}

	public render() {
		return (
			<div className="bitfinex-widget books-widget">
				<h4>Books Widget</h4>
				<div className="row text-center">
					<div className="col-4">PRICE</div>
					<div className="col-4">COUNT</div>
					<div className="col-4">AMOUNT</div>
				</div>
				<br />
				{this.props.books.map((book: Book, ind: number) => (
					<div className="row text-center book-widget-item bitfinex-widget-widget-item" key={ind}>
						<div className="col-4">
							<NumbersFormatter value={book.price} />
						</div>
						<div className="col-4">{book.price}</div>
						<div className="col-4">{book.amount}</div>
					</div>
				))}
			</div>
		);
	}
}
