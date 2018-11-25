import * as React from 'react';

export interface IRouteTitleProps {
	title?: string;
}

export class RouteTitle extends React.Component<IRouteTitleProps, any> {
	public currentTitle: string = '';

	constructor(props: IRouteTitleProps) {
		super(props);
	}

	public componentDidMount() {
		this.currentTitle = this.props.title || document.title;
		document.title = this.currentTitle;
	}

	public render() {
		return <React.Fragment>{this.props.children}</React.Fragment>;
	}
}
