import * as React from 'react';
import { withRouter } from 'react-router';
import { SymbolPageContainer } from './../../symbols/symbols-page.container';

export class SymbolRouter extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return <SymbolPageContainer currentSymbol={this.props.match.params.pair} />;
	}
}

export default withRouter(SymbolRouter);
